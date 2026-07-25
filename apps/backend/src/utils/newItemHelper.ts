import { FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSectionCol, FinStateSectionRow } from "@budgets_municipaux/common"


export function newColHelper(
    cols: FinStateSecColWHelp[],
    newCol:FinStateSectionCol
): FinStateSecColWHelp[] {
    const combine = [...cols,newCol].map((c,i)=>{
        return{
            ...c,
            column_order:i+1,
            edit_flag:c.column_order!==i+1?true:false}})
    return combine
}

export function newRowHelper(
    rows: FinStateSecRowWHelp[],
    newRow: FinStateSectionRow
): FinStateSecColWHelp[] {
    const parent_id = newRow.parent_id
    let combine: FinStateSecColWHelp[] = []
    if (parent_id === null) {
        combine = [...rows, newRow].map((c, i) => {
            return {
                ...c,
                item_order: i + 1,
                edit_flag: c.item_order !== i + 1 ? true : false
            }
        })
    } else {
        const parent_item = rows.find((r) => r.row_id === parent_id)
        if (parent_item) {
            const beforeItems = rows.filter((r) => r.item_order <= parent_item.item_order)
            const afterItems = rows.filter((r) => r.item_order > parent_item.item_order)
            combine = [...beforeItems, newRow, ...afterItems].map((r, i) => {
                return {
                    ...r,
                    item_order: i + 1,
                    edit_flag: r.item_order !== i + 1 ? true : false
                }
            })
        } else {
            throw new Error('specified incorrect parent item')
        }
    }

    return combine
}