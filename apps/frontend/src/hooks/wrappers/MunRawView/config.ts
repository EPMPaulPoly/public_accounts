
import type { VisualizationConfig } from "../../visualisation/types";
import type { reportRawViewOptions, reportRawViewSelection } from "./types";
import { serviceReportParts } from "../../../services/mun/serviceReportParts";
import type {FinStateSection, FinStateValueGrid, municipalite, regions } from "@budgets_municipaux/common";
import { serviceReportData } from "../../../services/mun/serviceData";
import { serviceMunicEnt } from "../../../services/mun/serviceMunicEntites";

const initialSelection: reportRawViewSelection = {
    report_page:null,
    year:null,
    region:null,
    region_type:'aucun',
    city:null
}


export const reportRawViewConfig:
    VisualizationConfig<
        reportRawViewSelection,
        reportRawViewOptions,
        FinStateValueGrid[]
    > = {
    initialSelection,

    async getOptions(selection: reportRawViewSelection) {
        let report_pages:FinStateSection[]
        report_pages = (await serviceReportParts.getReportParts())?.data??[]
        const years = (await serviceMunicEnt.getYears())?.data??[]
        let region_opts:regions[]=[]
        if (selection.year!==null&&selection.region_type!==null&&selection.region_type!=='aucun'){  
            region_opts = (await serviceMunicEnt.getRegionOptions(
                {region_type:selection.region_type,year:selection.year}
            ))?.data??[]
        }
        let city_opts:municipalite[]=[]
        if (selection.year!==null&&selection.region!==null&&selection.region_type!=='aucun'){
            city_opts = (await serviceMunicEnt.getMunic({
                year:selection.year,
                region_id:selection.region,
                region_type:selection.region_type
            }))?.data??[]
        }
        
        
        return{
            year_opts:years,
            region_opts:region_opts,
            region_type_opts:['aucun','cm','mrc','reg'],
            city_opts:city_opts,
            report_pages_opts:report_pages
        }
    },


    async getData(selection: reportRawViewSelection) {
        if ( selection.report_page!==null&&selection.year&&selection.city!==null) {
            const outRows:FinStateValueGrid[] = (await serviceReportData.getGridData(
                selection.city,
                selection.year,
                selection.report_page
            ))?.data??[]
            return outRows
        }
        return []
    },

};