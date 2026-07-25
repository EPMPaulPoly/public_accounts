import type { backend_response, EquationDef, EquationVar, EqVarWDesc, FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSection } from "@budgets_municipaux/common";
import { serviceIndicatorEquation } from "../../../services/mun/serviceMunicIndicators";
import type { VisualizationConfig } from "../../visualisation/types";
import type { 
    indicatorEquationCreationSelection, 
    indicatorEquationsCreationViewData, 
    indicatorEquationsCreationViewOptions 
} from "./types";
import { serviceReportParts } from "../../../services/mun/serviceReportParts";
import { serviceReportRows } from "../../../services/mun/serviceReportRows";
import { serviceReportCols } from "../../../services/mun/serviceReportCols";

const initialSelection: indicatorEquationCreationSelection = {
    eq_id:null,
    eq_create_flag:true,
    eq_var_id:null,
    eq_var_create_flag:false,
    part_id:null
}


export const municIndicCreateVizConfig:
    VisualizationConfig<
        indicatorEquationCreationSelection,
        indicatorEquationsCreationViewOptions,  
        indicatorEquationsCreationViewData
    > = {
    initialSelection,

    async getOptions(selection: indicatorEquationCreationSelection) {
        const [eqs,parts]:[
            backend_response<EquationDef[]>,
            backend_response<FinStateSection[]>
        ] = await Promise.all([
            serviceIndicatorEquation.getEquations(),
            serviceReportParts.getReportParts()
        ])
        if (selection.part_id !== null) {
            const [rowsData, colsData]: [
                backend_response<FinStateSecRowWHelp[]>, 
                backend_response<FinStateSecColWHelp[]>
            ] = await Promise.all([
                serviceReportRows.getReportRows({ part_id: selection.part_id }), 
                serviceReportCols.getReportCols({ part_id: selection.part_id })
            ])
            return {
                equations: eqs.data ?? [] as EquationDef[],
                parts: parts.data ?? [] as FinStateSection[],
                rows: rowsData.data ?? [] as FinStateSecRowWHelp[],
                cols: colsData.data ?? [] as FinStateSecColWHelp[]
            } as indicatorEquationsCreationViewOptions;
        } else {
            return {
                equations: eqs.data ?? [] as EquationDef[],
                parts: parts.data ?? [] as FinStateSection[],
                rows: [] as FinStateSecRowWHelp[],
                cols: [] as FinStateSecColWHelp[]
            } as indicatorEquationsCreationViewOptions;
        }
    },


    async getData(selection: indicatorEquationCreationSelection) {
        let resp:backend_response<EquationDef[]>
        let respVars:backend_response<EqVarWDesc[]>
        if (selection.eq_id){
            [resp,respVars] = await Promise.all([ 
                serviceIndicatorEquation.getEquations(selection.eq_id),  
                serviceIndicatorEquation.getVariables(selection.eq_id)
            ])
            if (resp.success===true&&resp.data&&respVars.success&&respVars.data){
                return {
                    equation_def:resp.data[0],
                    equation_vars:respVars.data
                }
            }
        }
            return {
                equation_def:null,
                equation_vars:[]
            }
        
    }
};