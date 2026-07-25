
import type { VisualizationConfig } from "../../visualisation/types";
import type { reportSetupData, reportSetupOption, reportSetupSelection } from "./types";
import { serviceReportParts } from "../../../services/mun/serviceReportParts";
import type { FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSection } from "@budgets_municipaux/common";
import { serviceReportRows } from "../../../services/mun/serviceReportRows";
import { serviceReportCols } from "../../../services/mun/serviceReportCols";

const initialSelection: reportSetupSelection = {
    part_id:null,
    row_edit:null,
    col_edit:null,
    new_part_flag:false
}


export const reportSetupConfig:
    VisualizationConfig<
        reportSetupSelection,
        reportSetupOption,
        reportSetupData
    > = {
    initialSelection,

    async getOptions(selection: reportSetupSelection) {
        let report_pages:FinStateSection[]
        report_pages = (await serviceReportParts.getReportParts())?.data??[]
        let available_rows:FinStateSecRowWHelp[]=[]
        if (selection.part_id){ 
            available_rows = (await serviceReportRows.getReportRows({part_id:selection.part_id}))?.data??[]
            if (selection.row_edit&&available_rows.length>0){
                available_rows = available_rows.filter((r)=>r.row_id!==selection.row_edit)??[]
            }
        }else{
            available_rows = []
        }
        
        return{
            report_pages: report_pages,
            selectable_parents:available_rows
        }
    },


    async getData(selection: reportSetupSelection) {
        if ( selection.part_id) {
            const outRows:FinStateSecRowWHelp[] = (await serviceReportRows.getReportRows({part_id:selection.part_id}))?.data??[]
            const outCols:FinStateSecColWHelp[] = (await serviceReportCols.getReportCols({part_id:selection.part_id}))?.data??[]
            return{rows:outRows,cols:outCols}
        }
        return{rows:[],cols:[]}
    },

};