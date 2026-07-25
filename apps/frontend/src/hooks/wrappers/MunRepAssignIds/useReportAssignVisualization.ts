
import type { backend_response, FinStateAssignGrid, FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSection, ProvincialDataId, year } from "@budgets_municipaux/common";
import { useVisualization } from "../../visualisation/useVisualisation";
import { reportSetupConfig } from "./config";
import { useEffect } from "react";
import { serviceReportData } from "../../../services/mun/serviceData";
import { serviceMunicEnt } from "../../../services/mun/serviceMunicEntites";
import { serviceReportAssign } from "../../../services/mun/serviceReportAssign";
import { serviceReportParts } from "../../../services/mun/serviceReportParts";

export function useReportAssignVisualization() {

    const viz = useVisualization(
        reportSetupConfig
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
                const initialPage=viz.selection.prov_id_select_page===null?0:viz.selection.prov_id_select_page
                const provIdResp = await serviceReportData.getUniqueDataTags(
                    years_max, 
                    viz.selection.prov_ids_per_page, 
                    viz.selection.prov_ids_per_page * initialPage)
                if (provIdResp.data && provIdResp.total) {
                    setProvIdOpts(provIdResp.data)
                    setTotalCount(provIdResp.total)
                }
            }
            if (repParts.success && repParts.data && repParts.data.length > 0) {
                setPageOpts(repParts.data)
                const firstPage = repParts.data[0].part_id
                setReportPart(firstPage)
                const data = await serviceReportAssign.getReportAssigns({ year: years_max, part_id: firstPage })
                if (data.data) {
                    overrideGrid(data.data)
                }
            }
        }
        fetchData()
    }, [])
    function setRowsPerPage(rppNew:number|null){
        if (rppNew !==10&&rppNew!==25&&rppNew!==50&&rppNew!==null){
                viz.updateSelection(selection => ({
                ...selection,
                prov_ids_per_page:rppNew as 10|25|50
            }));
        }
    }
    function setTablePage(TPNew:number){
            viz.updateSelection(selection => ({
                ...selection,
                prov_id_select_page:TPNew
            }));
    }
    function setYears(years:year[]){
        viz.updateOptions(selection => ({
            ...selection,
            year_opts:years
        }));
    }
    function setSearchStr(newFilt:string) {
        viz.updateSelection(selection => ({
            ...selection,
            prov_id_search: newFilt,
        }));
    }
    function setSelectedCode(newCode:string|null){
        viz.updateSelection(selection => ({
            ...selection,
            prov_rep_id: newCode,
        }));
    }
    function setMatch(newMatch:number|null){
        viz.updateSelection(selection => ({
            ...selection,
            match_id: newMatch,
        }));
    }
    function setProvIdOpts(provIds: ProvincialDataId[]){
        viz.updateOptions(selection => ({
            ...selection,
            provincial_ids_opts:provIds
        }));
    }
    function setPageOpts(pageOpts:FinStateSection[]){
        viz.updateOptions(selection => ({
            ...selection,
            report_pages_opts:pageOpts
        }));
    }
    function setTotalCount(count:number|null){
        viz.updateSelection(selection => ({
            ...selection,
            total_prov_ids: count,
        }));
    }

    function setYear(year: number | null) {
        viz.updateSelection(selection => ({
            ...selection,
            year: year,
            prov_id_select_page: 0,
        }));
    }

    function setReportPart(part_id: number | null) {
        viz.updateSelection(selection => ({
            ...selection,
            part_id: part_id,
        }));
    }
    function rowChange(newRow: number | null) {
        viz.updateSelection(selection => ({
            ...selection,
            row_edit: newRow,
        }));
    }
    function ColChange(newCol: number | null) {
        viz.updateSelection(selection => ({
            ...selection,
            col_edit: newCol,
        }));
    }
    function overrideGrid(rows: FinStateAssignGrid[]) {
        viz.updateData(data => ([
            ...rows]
        ));
    }
    async function forceUpdate() {
        await reportSetupConfig.getData(viz.selection)
    }

    return {
        ...viz,
        setReportPart,
        rowChange,
        ColChange,
        overrideGrid,
        forceUpdate,
        setYear,
        setRowsPerPage,
        setTotalCount,
        setTablePage,
        setSearchStr,
        setSelectedCode,
        setMatch
    };
}