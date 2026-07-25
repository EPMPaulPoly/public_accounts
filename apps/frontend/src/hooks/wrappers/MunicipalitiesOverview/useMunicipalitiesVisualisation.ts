import type { backend_response, FinStateSection, regions, year } from "@budgets_municipaux/common";
import { useVisualization } from "../../visualisation/useVisualisation";
import { municipalitiesViewConfig } from "./config";
import { useEffect } from "react";
import { serviceMunicEnt } from "../../../services/mun/serviceMunicEntites";
import { serviceReportParts } from "../../../services/mun/serviceReportParts";

export function useMunicipalitiesVisualization() {

    const viz = useVisualization(
        municipalitiesViewConfig
    );


    function setYear(year:number|null) {
        viz.updateSelection(selection => ({
            ...selection,
            year:year,
            region: null,
            page: 0
        }));
    }
    function setRegionType(type:'aucun'|'mrc'|'cm'|'reg'){
        viz.updateSelection(selection=>({
            ...selection,
            region_type:type,
            region:null,
            page:0
        }))
    }

    function setRegion(region_code:string) {
        const newRegion = viz.options?.regions.find((reg)=>reg.reg_code===region_code)
        if (newRegion){
        viz.updateSelection(selection => ({
            ...selection,
            region:String(newRegion.reg_code),
            page: 0
        }));
        }
    }
    function setPage(page:number){
        viz.updateSelection(selection => ({
            ...selection,
            page: page
        }));
    }
    function setRowsPerPage(rowsPerPage:number){
        viz.updateSelection(selection=>({
            ...selection,
            rows_per_page:rowsPerPage
        }))
    }


    return {
        ...viz,
        setYear,
        setRegion,
        setRegionType,
        setPage,
        setRowsPerPage
    };
}