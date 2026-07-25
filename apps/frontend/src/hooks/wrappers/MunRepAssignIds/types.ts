import type { FinStateAssignGrid, FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSection, ProvincialDataId, year } from "@budgets_municipaux/common"

export interface reportAssignSelection{
    part_id:number|null,
    row_edit:number|null,
    col_edit:number|null,
    prov_rep_id:string|null,
    prov_id_select_page:number|null,
    total_prov_ids:number|null,
    prov_ids_per_page:10|25|50
    prov_id_search:string,
    year:number|null
    match_id:number|null
}

export interface reportAssignOptions{
    report_pages_opts:FinStateSection[]
    provincial_ids_opts:ProvincialDataId[]
    prov_ids_per_page_opts:number[]
    year_opts:year[]
}

export interface reportAssignData{
    grid:FinStateAssignGrid[]
}