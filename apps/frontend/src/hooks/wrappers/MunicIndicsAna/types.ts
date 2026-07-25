import type {
    AnalysisType,
    AnalysisView,
    EquationCalcResult,
    EquationDef, 
    municipalite, 
    regions,
    year
} from "@budgets_municipaux/common"

export interface indicatorEquationAnalyseSelection{
    eq_id:number|null
    reg_type:'aucun'|'mrc'|'cm'|'reg'
    reg_id:string|null
    year:number|null,
    ana_type:'trans'|'long',
    ana_view:'table'|'chart',
    cod_geo:number|null,
    capitation:boolean
}

export interface indicatorEquationsAnalyseViewOptions{
    eq_opts:EquationDef[],
    reg_type_opts:('aucun'|'mrc'|'cm'|'reg')[]
    reg_opts:regions[],
    ana_type_opts:AnalysisType<'trans'|'long'>[],
    ana_view_opts:AnalysisView<'table'|'chart'>[],
    year_opts:year[],
    city_opts:municipalite[]
}

export interface indicatorEquationsAnalyseViewData{
    eq_results:EquationCalcResult[]|null,
}