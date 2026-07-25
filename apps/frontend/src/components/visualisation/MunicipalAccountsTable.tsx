import type { FinStateValueGrid } from "@budgets_municipaux/common";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useMemo, useState } from "react";




export function MunicipalAccountsTable({grid}:{grid:FinStateValueGrid[]}){
    const accounting = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        currencySign: 'accounting',
        maximumFractionDigits: 0,
    });

    const [expanded, setExpanded] = useState<Set<number>>(new Set());
    const rowMap = useMemo(() => new Map(grid.map(r => [r.row_id, r])), [grid])
    function toggleRow(row: FinStateValueGrid) {
        setExpanded(prev => {
            const next = new Set(prev);

            if (next.has(row.row_id)) {
                next.delete(row.row_id);
                return next;
            }

            // Accordion from level 1 downward
            if (row.level >= 2) {
                grid.forEach(r => {
                    if (
                        r.parent_id === row.parent_id &&
                        r.row_id !== row.row_id
                    ) {
                        next.delete(r.row_id);
                    }
                });
            }

            next.add(row.row_id);

            return next;
        });
    }
    function isVisible(row: FinStateValueGrid) {
        let parentId = row.parent_id;

        while (parentId != null) {
            if (!expanded.has(parentId)) {
                return false;
            }

            parentId = rowMap.get(parentId)?.parent_id ?? null;
        }

        return true;
    }


    return(<>
        <Table 
            stickyHeader 
            size='small' 
            sx={{ 
                width: '100%' ,
                tableLayout: "fixed",
            }}
        >
            <TableHead>
                <TableRow>
                    <TableCell
                        sx={{maxWidth:'20px'}}
                    >

                    </TableCell>
                    <TableCell>
                        Poste
                    </TableCell>
                    {grid.length>0?grid[0].cells.map((c)=>
                        <TableCell>
                            {c.column_desc}
                        </TableCell>
                    ):<></>}
                </TableRow>
            </TableHead>
            <TableBody>
                {grid.filter((rf)=>(isVisible(rf))).map((r)=>
                <TableRow>
                    <TableCell
                            sx={{ pl: `${(r.level + 1) * 16}px` }}
                        >
                            {(r.end_block??r.item_order) > r.item_order && (
                                <IconButton 
                                    onClick={() => toggleRow(r)} 
                                    size="small"
                                >
                                    {expanded.has(r.row_id)
                                        ? <KeyboardArrowDown />
                                        : <KeyboardArrowRight />
                                    }
                                </IconButton>
                            )}
                        </TableCell>
                    <TableCell
                       sx={{ pl: `${(r.level + 1) * 16}px` }}
                    >
                        {r.row_desc}
                    </TableCell>
                    {
                        r.cells.map((c2)=>
                            <TableCell align="right">
                                {c2.value!==null?accounting.format(c2.value):''}
                            </TableCell>
                        )
                    }
                </TableRow>
                )}
            </TableBody>
        </Table>
    </>)
}