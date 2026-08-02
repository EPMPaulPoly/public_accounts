import { 
    FinStateSecValueSibs, 
    FinStateValueGrid, 
} from "@budgets_municipaux/common";

export function reshapeDataHelper(
    result: FinStateSecValueSibs[]
):FinStateValueGrid[] {
    const rows = Object.values(
        result.reduce((acc, cell) => {
            const key = cell.row_id;

            if (!acc[key]) {
                acc[key] = {
                    row_id: cell.row_id,
                    item_order: cell.item_order,
                    row_desc: cell.row_desc,
                    part_id: cell.part_id,
                    parent_id: cell.parent_id,
                    cod_geo: cell.cod_geo,
                    level:cell.level,
                    next_sib:cell.next_sib,
                    prev_sib:cell.prev_sib,
                    end_block:cell.end_block,
                    cells: []
                };
            }

            acc[key].cells.push({
                match_id:cell.match_id,
                col_id: cell.col_id,
                row_id:cell.row_id,
                part_id:cell.part_id,
                prov_rep_id: cell.prov_rep_id,
                column_order: cell.column_order,
                column_desc: cell.column_desc,
                value:cell.value,
                value_text:cell.value_text
            });

            return acc;  
        }, {} as Record<number, any>)
    );

    rows.sort((a, b) => a.item_order - b.item_order);

    rows.forEach(row => {
        row.cells.sort((a:any,b:any) => a.column_order - b.column_order);
    });

    return rows;
}