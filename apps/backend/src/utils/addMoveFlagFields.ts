import { FinStateSecColSibs, FinStateSecColWHelp, FinStateSecRowSibs, FinStateSecRowWHelp } from "@budgets_municipaux/common";

export function addRowMoveFlagField(
    rows: FinStateSecRowSibs[]
): FinStateSecRowWHelp[] {
    return rows.map(row => {
        return {
            ...row,
            can_move_up:row.prev_sib!==undefined,
            can_move_down:row.next_sib!==undefined
        };
    }).sort((a,b)=>a.item_order-b.item_order);
}

export function addColMoveFlagField(cols: FinStateSecColSibs[]):FinStateSecColWHelp[] {
    return cols.map((col, index) => {
        return {
            ...col,
            can_move_left:col.prev_sib!==undefined,
            can_move_right:col.next_sib!==undefined
        };
    }).sort((a,b)=>a.column_order-b.column_order);
}