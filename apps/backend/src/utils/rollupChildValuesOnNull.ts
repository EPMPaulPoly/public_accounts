import { FinStateValueGrid } from "@budgets_municipaux/common";

/**
 * Rolls up child cell values into parent rows when the parent's value is null.
 * Processes bottom-up (deepest levels first) so multi-level roll-ups cascade correctly.
 *
 * @param incomingData FinStateValueGrid[] raw from database and processing
 * @returns FinStateValueGrid[] with child values rolled up when parent values are null
 */
export function rollUpChildValuesOnNull(
    incomingData: FinStateValueGrid[]
): FinStateValueGrid[] {
    const maxLevel = Math.max(...incomingData.map((r) => r.level));
    if (maxLevel <= 0) {
        return incomingData;
    }

    // Build a map: parent_row_id → [child_row_id, ...]
    const childrenMap = new Map<number, number[]>();
    for (const r of incomingData) {
        if (r.parent_id != null) {
            const siblings = childrenMap.get(r.parent_id) ?? [];
            siblings.push(r.row_id);
            childrenMap.set(r.parent_id, siblings);
        }
    }

    // Work on a copy so we don't mutate the input
    const result: FinStateValueGrid[] = incomingData.map((r) => ({
        ...r,
        cells: r.cells.map((c) => ({ ...c })),
    }));

    // Index rows by row_id for fast lookup
    const rowById = new Map<number, FinStateValueGrid>();
    for (const r of result) {
        rowById.set(r.row_id, r);
    }

    // Process bottom-up: highest level first so cascading roll-ups work
    const byLevelDesc = [...result].sort((a, b) => b.level - a.level);

    for (const row of byLevelDesc) {
        const childIds = childrenMap.get(row.row_id);
        if (!childIds || childIds.length === 0) continue;

        for (const cell of row.cells) {
            if (cell.value !== null) continue;

            let sum = 0;
            let hasAnyValue = false;

            for (const childId of childIds) {
                const childRow = rowById.get(childId);
                if (!childRow) continue;
                const childCell = childRow.cells.find(
                    (cc) => cc.column_order === cell.column_order
                );
                if (childCell && childCell.value !== null) {
                    sum += childCell.value;
                    hasAnyValue = true;
                }
            }

            cell.value = hasAnyValue ? sum : null;
        }
    }

    return result;
}