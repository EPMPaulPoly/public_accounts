import type { municipalite, regions, year } from "@budgets_municipaux/common"

export interface municipalitiesViewSelection{
    year:number|null,
    region_type:'aucun'|'mrc'|'reg'|'cm'
    region:string|null,
    page:number,
    rows_per_page:number
}

export interface municipalitiesViewOptions{
    years:year[]
    regions:regions[]
    rows_per_page_options:number[]
    region_types:('aucun'|'cm'|'reg'|'mrc')[]
}

export interface municipalitiesViewData{
    municipalities:municipalite[]
    totalCount:number
}