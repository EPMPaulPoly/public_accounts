import type { FinStateAssignGrid, FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSection, FinStateValueGrid, municipalite, ProvincialDataId, regions, year } from "@budgets_municipaux/common"

export interface reportRawViewSelection{
    report_page:number|null
    year:number|null,
    region:string|null
    region_type:'aucun'|'cm'|'reg'|'mrc'
    city:number|null
}

export interface reportRawViewOptions{
    report_pages_opts:FinStateSection[]
    year_opts:year[]
    region_type_opts:('aucun'|'cm'|'reg'|'mrc')[]
    region_opts:regions[]
    city_opts:municipalite[]
}

