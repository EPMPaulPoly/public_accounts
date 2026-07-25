import { 
    type FinStateAssignGrid, 
    type FinStateSection 
} from "@budgets_municipaux/common";
import { Delete, Edit, KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { 
    IconButton,
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow 
} from "@mui/material";
import { 
    type SetStateAction, 
    type Dispatch,
    useMemo,
    useState, 
} from "react";
import { serviceReportAssign } from "../../services/mun/serviceReportAssign";
import { getAssignFromGrid, getCodeFromGrid } from "../../utils/gridSearch";
import { authClient } from "../../utils/auth-client";

interface props{
    selection:{
        rowEdit:number|null,
        colEdit:number|null,
        page:number|null,
        year:number|null,
        codeAssignModalOpen:boolean
    },
    onChangeSel:{
        setColEdit:(ColToEdit: number|null)=>void;
        setRowEdit:(RowToEdit:number|null)=>void;
        setCodeAssignModalOpen:Dispatch<SetStateAction<boolean>>
        setSelectedCode:(code:string|null)=>void
        setMatch:(match_id:number|null)=>void
    },
    data:FinStateAssignGrid[],
    onChangeData:(newGrid:FinStateAssignGrid[])=>void
    
    
}
export default function GridAssignTable(props:props){
        const { data: session, isPending } = authClient.useSession();
              
        const isAdmin = session?.user.role === 'admin';
        const [expanded, setExpanded] = useState<Set<number>>(new Set());
        const rowMap = useMemo(() => new Map(props.data.map(r => [r.row_id, r])),[props.data])
        function toggleRow(row: FinStateAssignGrid) {
            setExpanded(prev => {
                const next = new Set(prev);
    
                if (next.has(row.row_id)) {
                    next.delete(row.row_id);
                    return next;
                }
    
                // Accordion from level 1 downward
                if (row.level >= 2) {
                    props.data.forEach(r => {
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
        function isVisible(row: FinStateAssignGrid) {
            let parentId = row.parent_id;
    
            while (parentId != null) {
                if (!expanded.has(parentId)) {
                    return false;
                }
    
                parentId = rowMap.get(parentId)?.parent_id ?? null;
            }
    
            return true;
        }


    function handleCellClick(row:number,col:number){
        if (isAdmin) {
            props.onChangeSel.setRowEdit(row)
            props.onChangeSel.setColEdit(col)
            props.onChangeSel.setSelectedCode(getCodeFromGrid(props.data, row, col))
        }
    }
    function handleModalOpen(){
        if(isAdmin){
        props.onChangeSel.setCodeAssignModalOpen(true)}
    }
    async function handleDelete(){
        if (isAdmin) {
            const match_id = getAssignFromGrid(props.data, props.selection.rowEdit, props.selection.colEdit)
            if (props.selection.page && typeof match_id === 'number' && props.selection.year) {
                const data = await serviceReportAssign.deleteReportAssign(match_id, props.selection.year, props.selection.page)
                if (data.success && data.data) {
                    props.onChangeData(data.data ?? [])
                    props.onChangeSel.setColEdit(null)
                    props.onChangeSel.setRowEdit(null)
                }
            }
        }
    }
    return(
        <>
        {props.data!==null&&props.data.length>1?
        <Table
            stickyHeader 
            size="small"
        >
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                        Poste
                    </TableCell>
                    
                    {props.data[0].cells.map((r)=><TableCell>
                        {r.column_desc}
                    </TableCell>)

                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {props.data.filter((rf)=>(isVisible(rf))).map((r:FinStateAssignGrid)=><TableRow>
                    <TableCell
                            sx={{ pl: `${(r.level + 1) * 16}px` }}
                        >
                            {(r.end_block??r.item_order) > r.item_order && props.selection.rowEdit===null &&props.selection.colEdit===null && (
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
                    {r.cells.map((c)=>{return(r.row_id===props.selection.rowEdit&&c.col_id===props.selection.colEdit?
                        <TableCell
                            sx={{ backgroundColor: 'AccentColor' }}
                        >
                            {c.prov_rep_id===null?'N/A':c.prov_rep_id}<Edit onClick={handleModalOpen}/><Delete onClick={handleDelete}/>
                        </TableCell>:<TableCell
                            onClick={()=>handleCellClick(r.row_id,c.col_id)}
                        >
                            {c.prov_rep_id===null?'N/A':c.prov_rep_id}
                        </TableCell>)})}
                </TableRow>)}
            </TableBody>
        </Table>:<></>}
        </>
    )
}