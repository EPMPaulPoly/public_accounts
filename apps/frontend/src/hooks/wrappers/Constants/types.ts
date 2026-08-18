import type {
    IndicatorConstant, 
} from "@budgets_municipaux/common"

export interface constantsSelection{
    const_id:number|null
}

export interface constantsOptions{
    constOptions:IndicatorConstant[],
}

export interface constantsData{
    constToMod:IndicatorConstant|null,
}

