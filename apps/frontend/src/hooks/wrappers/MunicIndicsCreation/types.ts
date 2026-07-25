import type {
    EquationDef, 
    EqVarWDesc, 
    FinStateSecColWHelp, 
    FinStateSecRowWHelp, 
    FinStateSection 
} from "@budgets_municipaux/common"

export interface indicatorEquationCreationSelection{
    eq_id:number|null
    eq_create_flag:boolean,
    eq_var_id:number|null,
    eq_var_create_flag:boolean,
    part_id:number|null,
}

export interface indicatorEquationsCreationViewOptions{
    equations:EquationDef[],
    parts:FinStateSection[],
    rows:FinStateSecRowWHelp[],
    cols:FinStateSecColWHelp[]
}

export interface indicatorEquationsCreationViewData{
    equation_def:EquationDef|null,
    equation_vars:EqVarWDesc[]
}