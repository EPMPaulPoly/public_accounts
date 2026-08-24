import { EquationCalcFormatted, IndicatorConstant, IndicatorWUse } from "@budgets_municipaux/common";


export function addConstantsToCalcPrec(formattedAccount:EquationCalcFormatted[],consts:IndicatorWUse[]){
    const out = formattedAccount.map((item)=>{
        const cellsAddConstant={...item}
        consts.filter((cst1)=>cst1.eq_id===item.eq_id).forEach((cst)=>{
            const cstToPush={
                eq_id:cst.eq_id!==undefined?cst.eq_id:0,
                use_id:cst.use_id!==undefined?cst.use_id:0,
                const_id:cst.const_id,
                constant_desc:cst.constant_desc,
                symbol:cst.symbol,
                default_value:cst.default_value,
                index_year:cst.index_year
            }
            cellsAddConstant.consts.push(cstToPush)
            cellsAddConstant.scope[cst.symbol] = cst.default_value}
        )
        return cellsAddConstant
    })
    return out
}