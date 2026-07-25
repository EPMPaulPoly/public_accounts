
import type { backend_response,  FinStateSection, FinStateValueGrid, regions, year } from "@budgets_municipaux/common";
import { useVisualization } from "../../visualisation/useVisualisation";
import { reportRawViewConfig, } from "./config";
import { useEffect } from "react";
import { serviceReportData } from "../../../services/mun/serviceData";
import { serviceMunicEnt } from "../../../services/mun/serviceMunicEntites";
import { serviceReportParts } from "../../../services/mun/serviceReportParts";

export function useReportRawViewVisualization() {

    const viz = useVisualization(
        reportRawViewConfig
    );

    useEffect(() => {
        const fetchData = async () => {
            const [years, repParts]: [
                backend_response<year[]>,
                backend_response<FinStateSection[]>
            ] = await Promise.all([serviceMunicEnt.getYears(), serviceReportParts.getReportParts()])
            let years_max = 2025;
            if (years.success && years.data !== undefined) {
                console.log('received year', years.data)
                setYears([...years.data])
                const years_fin = years.data?.map((row) => row.year) ?? [];
                years_max = Math.max(...years_fin, 0);
                setYear(years_max)
            }
            if (repParts.success&&repParts.data&&repParts.data?.length>0){
                setRepPartsOpts(repParts.data)
            }
        }
        fetchData()
    }, [])
    
    

    function setYear(year: number | null) {
        viz.updateSelection(selection => ({
            ...selection,
            year: year,
        }));
    }

    function setReportPart(part_id: number | null) {
        viz.updateSelection(selection => ({
            ...selection,
            report_page:part_id
        }));
    }

    function setRegType(newRegType:'aucun'|'cm'|'mrc'|'reg'){
        viz.updateSelection(selection => ({
            ...selection,
            region_type:newRegType
        }));
    }
    function setReg(newReg:string|null){
        viz.updateSelection(selection => ({
            ...selection,
            region:newReg
        }));
    }
    function setCity(newCity:number|null){
        viz.updateSelection(selection => ({
            ...selection,
            city:newCity
        }));
    }

    function setYears(years:year[]){
        viz.updateOptions(selection => ({
            ...selection,
            year_opts:years
        }));
    }
    function setRepPartsOpts(newRepParts:FinStateSection[]){
        viz.updateOptions(selection => ({
            ...selection,
            report_pages_opts:newRepParts
        }));
    }

    function overrideGrid(rows: FinStateValueGrid[]) {
        viz.updateData(data => ({
            ...data,
            grid: rows,
        }));
    }
    async function forceUpdate() {
        await reportRawViewConfig.getData(viz.selection)
    }

    return {
        ...viz,
        setReportPart,
        overrideGrid,
        forceUpdate,
        setYear,
        setRegType,
        setReg,
        setCity
    };
}