import { FinStateSecColLev, FinStateSecColWHelp, FinStateSecRowLev, FinStateSecRowWHelp, FinStateSectionRow } from "@budgets_municipaux/common";
import { stripColHelperColumns, stripColHelperColumnsLev, stripRowHelperColumns, stripRowHelperColumnsLev } from "./stripHelperColumns";
import { addColSiblings, addRowSiblings } from "./addSiblingsRows";
import { addColMoveFlagField, addRowMoveFlagField } from "./addMoveFlagFIelds";


export function moveRowHelper(
    rows: FinStateSecRowWHelp[],
    rowId: number,
    direction: 'up' | 'down'
): FinStateSecRowWHelp[] {

    if (direction === 'up') {
        return moveUp(
            rows,
            rowId)
    } else {
        return moveDown(
            rows,
            rowId)
    }
}

function moveUp(
    rows: FinStateSecRowWHelp[],
    rowId: number,): FinStateSecRowWHelp[] {
    const sort_asc = [...rows].sort((a, b) => a.item_order - b.item_order);

    const rowLow = sort_asc.find((r) => r.row_id === rowId);
    
    if (!rowLow) {
        throw new Error("Row not found");
    }
    if (!rowLow.can_move_up) {
        throw new Error("Can't move this row up");
    }
    else {
        const rowHigh = [...sort_asc].find((r) => r.item_order === rowLow.prev_sib);
        const beforeBlock = [...sort_asc].filter((r) => r.item_order < rowHigh.item_order)
        const blockMoveDown = [...sort_asc].filter((r) => r.item_order >= rowHigh.item_order && r.item_order <= rowHigh.end_block).map((r) => { return { ...r, edit_flag: true } })
        const blockMoveUp= [...sort_asc].filter((r) => r.item_order >= rowLow.item_order && r.item_order <= rowLow.end_block).map((r) => { return { ...r, edit_flag: true } })
        const blockAfter = [...sort_asc].filter((r) => r.item_order > rowLow.end_block)
        const reArrange = [...beforeBlock, ...blockMoveUp, ...blockMoveDown, ...blockAfter].map((r, i) => { return { ...r, item_order: i + 1 } })
        const stripReRun = addRowMoveFlagField(addRowSiblings(stripRowHelperColumnsLev(reArrange)))
        return stripReRun
    }
}

function moveDown(
    rows: FinStateSecRowWHelp[],
    rowId: number,): FinStateSecRowWHelp[] {
    const sort_asc = [...rows].sort((a, b) => a.item_order - b.item_order);

    const rowHi = sort_asc.find((r) => r.row_id === rowId);
    
    if (!rowHi) {
        throw new Error("Row not found");
    }
    if (!rowHi.can_move_down) {
        throw new Error("Can't move this row down");
    }
    else {
        const roLo = [...sort_asc].find((r) => r.item_order === rowHi.next_sib);
        const beforeBlock = [...sort_asc].filter((r) => r.item_order < rowHi.item_order)
        const blockMoveUp = [...sort_asc].filter((r) => r.item_order >= rowHi.item_order && r.item_order <= rowHi.end_block).map((r) => { return { ...r, edit_flag: true } })
        const blockMoveDown = [...sort_asc].filter((r) => r.item_order >= roLo.item_order && r.item_order <= roLo.end_block).map((r) => { return { ...r, edit_flag: true } })
        const blockAfter = [...sort_asc].filter((r) => r.item_order > roLo.end_block)
        const reArrange = [...beforeBlock, ...blockMoveDown, ...blockMoveUp, ...blockAfter].map((r, i) => { return { ...r, item_order: i + 1 } })
        const stripReRun = addRowMoveFlagField(addRowSiblings(stripRowHelperColumnsLev(reArrange)))
        return stripReRun
    }
}

export function moveColHelper(
    rows: FinStateSecColWHelp[],
    rowId: number,
    direction: 'left' | 'right'
): FinStateSecColWHelp[] {

    if (direction === 'left') {
        return moveLeft(
            rows,
            rowId)
    } else {
        return moveRight(
            rows,
            rowId)
    }
}

function moveLeft(
    rows: FinStateSecColWHelp[],
    rowId: number,): FinStateSecColWHelp[] {
    const sort_asc = [...rows].sort((a, b) => a.column_order - b.column_order);

    const rowLow = sort_asc.find((r) => r.col_id === rowId);
    
    if (!rowLow) {
        throw new Error("Row not found");
    }
    if (!rowLow.can_move_left) {
        throw new Error("Can't move this row left");
    }
    else {
        const rowHigh = [...sort_asc].find((r) => r.column_order === rowLow.prev_sib);
        const beforeBlock = [...sort_asc].filter((r) => r.column_order < rowHigh.column_order)
        const blockMoveUp = [...sort_asc].filter((r) => r.column_order >= rowHigh.column_order && r.column_order <= rowHigh.end_block).map((r) => { return { ...r, edit_flag: true } })
        const blockMoveDown = [...sort_asc].filter((r) => r.column_order >= rowLow.column_order && r.column_order <= rowLow.end_block).map((r) => { return { ...r, edit_flag: true } })
        const blockAfter = [...sort_asc].filter((r) => r.column_order > rowLow.end_block)
        const reArrange = [...beforeBlock, ...blockMoveDown, ...blockMoveUp, ...blockAfter].map((r, i) => { return { ...r, column_order: i + 1 } })
        const stripReRun = addColMoveFlagField(addColSiblings(stripColHelperColumnsLev(reArrange)))
        return stripReRun
    }
}

function moveRight(
    rows: FinStateSecRowWHelp[],
    rowId: number,): FinStateSecRowWHelp[] {
    const sort_asc = [...rows].sort((a, b) => a.column_order - b.column_order);

    const rowHi = sort_asc.find((r) => r.col_id === rowId);
    
    if (!rowHi) {
        throw new Error("Row not found");
    }
    if (!rowHi.can_move_right) {
        throw new Error("Can't move this row right");
    }
    else {
        const roLo = [...sort_asc].find((r) => r.column_order === rowHi.next_sib);
        const beforeBlock = [...sort_asc].filter((r) => r.column_order < rowHi.column_order)
        const blockMoveUp = [...sort_asc].filter((r) => r.column_order >= rowHi.column_order && r.column_order <= rowHi.end_block).map((r) => { return { ...r, edit_flag: true } })
        const blockMoveDown = [...sort_asc].filter((r) => r.column_order >= roLo.column_order && r.column_order <= roLo.end_block).map((r) => { return { ...r, edit_flag: true } })
        const blockAfter = [...sort_asc].filter((r) => r.column_order > roLo.end_block)
        const reArrange = [...beforeBlock, ...blockMoveDown, ...blockMoveUp, ...blockAfter].map((r, i) => { return { ...r, column_order: i + 1 } })
        const stripReRun = addColMoveFlagField(addColSiblings(stripColHelperColumnsLev(reArrange)))
        return stripReRun
    }
}
