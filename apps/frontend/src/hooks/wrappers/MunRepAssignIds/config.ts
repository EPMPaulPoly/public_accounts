
import type { VisualizationConfig } from "../../visualisation/types";
import type { reportAssignData, reportAssignOptions, reportAssignSelection } from "./types";
import { serviceReportParts } from "../../../services/mun/serviceReportParts";
import type { FinStateAssignGrid, FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSection, ProvincialDataId } from "@budgets_municipaux/common";
import { serviceReportRows } from "../../../services/mun/serviceReportRows";
import { serviceReportCols } from "../../../services/mun/serviceReportCols";
import { serviceReportData } from "../../../services/mun/serviceData";
import { serviceMunicEnt } from "../../../services/mun/serviceMunicEntites";
import { serviceReportAssign } from "../../../services/mun/serviceReportAssign";

const initialSelection: reportAssignSelection = {
    part_id:null,
    row_edit:null,
    col_edit:null,
    prov_rep_id:null,
    prov_id_select_page:0,
    prov_ids_per_page:10,
    total_prov_ids:null,
    prov_id_search:'',
    year:null,
    match_id:null
}


export const reportSetupConfig:
    VisualizationConfig<
        reportAssignSelection,
        reportAssignOptions,
        FinStateAssignGrid[]
    > = {
    initialSelection,

    async getOptions(selection: reportAssignSelection) {
        let report_pages:FinStateSection[]
        report_pages = (await serviceReportParts.getReportParts())?.data??[]
        const years = (await serviceMunicEnt.getYears())?.data??[]
        let prov_id_options:ProvincialDataId[]=[]
        if (selection.prov_id_search!==''
            &&selection.year!==null
            &&selection.prov_ids_per_page!==null
            &&selection.prov_id_select_page!==null
        ){  

            prov_id_options = (await serviceReportData.getUniqueDataTags(
                selection.year,
                selection.prov_ids_per_page,
                selection.prov_id_select_page*selection.
                prov_ids_per_page,
                selection.prov_id_search
            ))?.data??[]
        }
        
        
        return{
            report_pages_opts:report_pages,
            prov_ids_per_page_opts:[10,25,50],
            provincial_ids_opts:prov_id_options,
            year_opts:years
        }
    },


    async getData(selection: reportAssignSelection) {
        if ( selection.part_id&&selection.year) {
            const outRows:FinStateAssignGrid[] = (await serviceReportAssign.getReportAssigns({part_id:selection.part_id,year:selection.year}))?.data??[]
            return outRows
        }
        return []
    },

};