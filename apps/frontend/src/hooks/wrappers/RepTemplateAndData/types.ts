import type {  FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSection } from "@budgets_municipaux/common"

export interface reportSetupSelection{
    part_id:number|null,
    row_edit:number|null,
    col_edit:number|null,
    new_part_flag:boolean
}

export interface reportSetupOption{
    report_pages:FinStateSection[]
    selectable_parents:FinStateSecRowWHelp[]
}

export interface reportSetupData{
    rows:FinStateSecRowWHelp[]
    cols:FinStateSecColWHelp[]
}