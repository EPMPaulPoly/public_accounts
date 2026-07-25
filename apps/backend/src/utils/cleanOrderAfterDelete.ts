import type { FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSectionCol, FinStateSectionRow } from "@budgets_municipaux/common";

export function cleanRowOrderAfterDelete(unModifiedRow:FinStateSectionRow[]):FinStateSectionRow[]{
    return unModifiedRow
        .sort((a, b) => (a.item_order ?? 0) - (b.item_order ?? 0))
        .map((row, index) => ({
            ...row,
            item_order: index + 1
        }));
}

export function cleanColOrderAfterDelete(unModifiedCol:FinStateSectionCol[]):FinStateSectionCol[]{
    return unModifiedCol
        .sort((a, b) => (a.column_order ?? 0) - (b.column_order ?? 0))
        .map((row, index) => ({
            ...row,
            column_order: index + 1
        }));
}
