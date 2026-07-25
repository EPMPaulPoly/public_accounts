import { FinStateSecColLev, FinStateSecColWHelp, FinStateSecRowLev, FinStateSecRowWHelp, FinStateSectionCol, FinStateSectionRow } from "@budgets_municipaux/common"

export function addRowLevelEditFlagFields(cleanRows: FinStateSectionRow[]): FinStateSecRowLev[] {
    const topLevels = cleanRows.filter((rowF) => rowF.parent_id === null)
    const haveParents = cleanRows.filter((rowF) => rowF.parent_id !== null && isFinite(rowF.parent_id))
    const stragglers = cleanRows.filter((rowF) => rowF.parent_id !== null && !isFinite(rowF.parent_id))
    console.log(stragglers)
    if (stragglers.length > 0) throw new Error('row should not have non finite non null parent_id')
    let finalOut: any[] = []
    finalOut.push(...topLevels.map((rowP) => { return { ...rowP, edit_flag: false, level: 0 } }))
    recursiveSearch(topLevels, haveParents, 0, finalOut)
    finalOut.sort((rowSA, rowSB) => rowSA.item_order - rowSB.item_order)
    return finalOut


}

function recursiveSearch(potParents: any[], potChild: any[], level: number, finalOut: any[]) {
    if (potChild.length > 0) {
        const hiParentsIds = new Set([...potParents.map((rowP) => rowP.row_id)])
        const thisLevel = potChild.filter((rowC) => rowC.parent_id !== null && hiParentsIds.has(rowC.parent_id))
        const nextLevel = potChild.filter((rowC) => rowC.parent_id !== null && !hiParentsIds.has(rowC.parent_id))
        potParents.push(...thisLevel)
        finalOut.push(...thisLevel.map((rowP) => { return { ...rowP, edit_flag: false, level: level + 1 } }))
        if (nextLevel.length > 0) {
            recursiveSearch(potParents, nextLevel, level + 1, finalOut)
        }
    }
}
export function addColLevelEditFlagFields(cleanCols: FinStateSectionCol[]): FinStateSecColLev[] {
    const addedLevels = cleanCols.sort((a, b) => a.column_order - b.column_order).map((colM) => { return { ...colM, edit_flag: false, level: 0 } })

    return addedLevels
}