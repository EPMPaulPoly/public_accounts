import type { FinStateSecColLev, FinStateSecColWHelp, FinStateSecRowLev, FinStateSecRowWHelp, FinStateSectionCol, FinStateSectionRow } from "@budgets_municipaux/common";


export function stripRowHelperColumns(rowsWHelper:FinStateSecRowWHelp[]):FinStateSectionRow[]{
    const rowsOut= rowsWHelper.map(
        (rowM:FinStateSecRowWHelp)=>{
            return{
                row_id:rowM.row_id,
                part_id:rowM.part_id,
                parent_id:rowM.parent_id,
                row_desc:rowM.row_desc,
                item_order:rowM.item_order
            }})as unknown[] as FinStateSectionRow[]
    return rowsOut
}

export function stripColHelperColumns(colsWHelper:FinStateSecColWHelp[]):FinStateSectionCol[]{
    const colsOut= colsWHelper.map(
        (rowM:FinStateSecColWHelp)=>{
            return{
                col_id:rowM.col_id,
                part_id:rowM.part_id,
                column_desc:rowM.column_desc,
                column_order:rowM.column_order
            }})as unknown[] as FinStateSectionCol[]
    return colsOut
}

export function stripRowHelperColumnsLev(rowsWHelper:FinStateSecRowWHelp[]):FinStateSecRowLev[]{
    const rowsOut= rowsWHelper.map(
        (rowM:FinStateSecRowWHelp)=>{
            return{
                row_id:rowM.row_id,
                part_id:rowM.part_id,
                parent_id:rowM.parent_id,
                row_desc:rowM.row_desc,
                item_order:rowM.item_order,
                edit_flag:rowM.edit_flag,
                level:rowM.level
            }})as unknown[] as FinStateSecRowLev[]
    return rowsOut
}

export function stripColHelperColumnsLev(colsWHelper:FinStateSecColWHelp[]):FinStateSecColLev[]{
    const colsOut= colsWHelper.map(
        (rowM:FinStateSecColWHelp)=>{
            return{
                col_id:rowM.col_id,
                part_id:rowM.part_id,
                column_desc:rowM.column_desc,
                column_order:rowM.column_order,
                edit_flag:rowM.edit_flag,
                level:rowM.level
            }})as unknown[] as FinStateSecColLev[]
    return colsOut
}
