import type {
    FinStateSecColWHelp,
    FinStateSecRowWHelp,
} from "@budgets_municipaux/common"
import { 
    Alert, 
    Button, 
    IconButton, 
    MenuItem, 
    Select, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TextField 
} from "@mui/material"
import { 
    useMemo,
    useState, 
    type Dispatch, 
    type SetStateAction 
} from "react"
import { 
    Cancel, 
    Delete, 
    KeyboardArrowDown, 
    KeyboardArrowLeft, 
    KeyboardArrowRight, 
    KeyboardArrowUp, 
    Save 
} from "@mui/icons-material"
import { serviceReportRows } from "../../services/mun/serviceReportRows"
import { serviceReportCols } from "../../services/mun/serviceReportCols"
import { NewReportPageItemModal } from "./NewReportPageItemModal"
import { authClient } from "../../utils/auth-client"

interface props {
    editing: boolean
    setEditing: Dispatch<SetStateAction<boolean>>
    selection:{
        PartId:number|null,
        RowEdit:number|null,
        ColEdit:number|null
    }
    onChangeLoc:{
        setPartId: (page:number|null)=>void
        setRowEdit: (row:number|null)=>void,
        setColEdit: (col:number|null)=>void,
    }
    data:{
        rows:FinStateSecRowWHelp[],
        cols:FinStateSecColWHelp[]
    }
    setData:{
        updateRows:(rows:FinStateSecRowWHelp[])=>void,
        updateCols:(cols:FinStateSecRowWHelp[])=>void
    }
    forceDataUpdate:()=>void

}

function ReportPageCreator(props: props) {
    const { data: session, isPending } = authClient.useSession();
      
    const isAdmin = session?.user.role === 'admin';

    const [targetParentRow, setTargetParentRow] = useState<FinStateSecRowWHelp | null>(null)
    const [newItemModalOpen,setNewItemModalOpen]=useState<boolean>(false);
    const [newItemType,setNewItemType]=useState<'row'|'col'|null>(null)
    const [expanded, setExpanded] = useState<Set<number>>(new Set());
    const rowMap = useMemo(() => new Map(props.data.rows.map(r => [r.row_id, r])),[props.data.rows])
    function toggleRow(row: FinStateSecRowWHelp) {
        setExpanded(prev => {
            const next = new Set(prev);

            if (next.has(row.row_id)) {
                next.delete(row.row_id);
                return next;
            }

            // Accordion from level 1 downward
            if (row.level >= 2) {
                props.data.rows.forEach(r => {
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
    function isVisible(row: FinStateSecRowWHelp) {
        let parentId = row.parent_id;

        while (parentId != null) {
            if (!expanded.has(parentId)) {
                return false;
            }

            parentId = rowMap.get(parentId)?.parent_id ?? null;
        }

        return true;
    }
    async function handleSave() {
        if (props.selection.RowEdit !== null) {
            const rowsToSave = props.data.rows.filter((rowF) => rowF.edit_flag === true)
            if (rowsToSave !== undefined && rowsToSave.every((rowC) => rowC satisfies FinStateSecRowWHelp)) {
                const data = await serviceReportRows.UpsertRows(rowsToSave)
                if (data.data) {
                    props.setEditing(false)
                    props.onChangeLoc.setRowEdit(null)
                }

            }
        }
        if (props.selection.ColEdit !== null) {
            const colsToSave = props.data.cols.filter((colF) => colF.edit_flag === true)
            if (colsToSave !== undefined && colsToSave.every((colC) => colC satisfies FinStateSecColWHelp)) {
                const data = await serviceReportCols.UpsertCols(colsToSave)
                if (data.data) {
                    props.setEditing(false)
                    props.onChangeLoc.setRowEdit(null)
                }
            }
        }
    }

    async function handleCancel() {
            props.setEditing(false)
            props.onChangeLoc.setRowEdit(null)
            props.onChangeLoc.setColEdit(null)
    }

    async function handleDelete() {
        if (props.selection.RowEdit!== null) {
            const newRowSetup = await serviceReportRows.deleteRow(props.selection.RowEdit)

            props.onChangeLoc.setRowEdit(null)
            props.setEditing(false)
            props.forceDataUpdate()
        }
        if (props.selection.ColEdit !== null) {
            const newColSetup = await serviceReportCols.deleteCol(props.selection.ColEdit)
            props.onChangeLoc.setColEdit(null)
            props.setEditing(false)
            props.forceDataUpdate()
        }
    }
    async function handleMoveUp() {
        if (props.selection.RowEdit !== null && props.editing && props.selection.PartId !== null) {
            const newRows = await serviceReportRows.moveRow(
                props.selection.RowEdit,
                props.selection.PartId,
                'up'
            )
            if (newRows.success && newRows.data !== undefined) {
                props.setData.updateRows(newRows.data)
            }
        }
    }
    async function handleMoveDown() {
        if (props.selection.RowEdit !== null && props.editing && props.selection.PartId !== null) {
            const newRows = await serviceReportRows.moveRow(
                props.selection.RowEdit,
                props.selection.PartId,
                'down'
            )
            if (newRows.success && newRows.data !== undefined) {
                props.setData.updateRows(newRows.data)

            }
        }
    }
    async function handleMoveLeft() {
        if (props.selection.ColEdit !== null && props.editing && props.selection.PartId !== null) {
            const newRows = await serviceReportCols.moveCol(
                props.selection.ColEdit,
                props.selection.PartId,
                'left'
            )
            if (newRows.success && newRows.data !== undefined) {
                props.setData.updateCols(newRows.data)
            }
        }
    }
    async function handleMoveRight() {
        if (props.selection.ColEdit !== null && props.editing && props.selection.PartId !== null) {
            const newRows = await serviceReportCols.moveCol(
                props.selection.ColEdit,
                props.selection.PartId,
                'right'
            )
            if (newRows.success && newRows.data !== undefined) {
                props.setData.updateCols(newRows.data)

            }
        }
    }
    function beginAddLine() {
        if (props.selection.PartId !== null) {
            if (!props.editing) {
                setNewItemType('row')
                setNewItemModalOpen(true)
                props.setEditing(true)
                /*
                const maxOrder = isFinite(Math.max(...props.reportRows.map((row) => row.item_order))) ? Math.max(...props.reportRows.map((row) => row.item_order)) : 0
                const newLine: FinStateSecRowWHelp = {
                    row_id: -1,
                    part_id: props.page.part_id,
                    item_order: targetParentRow === null ? maxOrder + 1 : targetParentRow.item_order + 1,
                    parent_id: targetParentRow === null ? null : targetParentRow.row_id,
                    row_desc: '',
                    edit_flag: true,
                    level: targetParentRow === null ? 0 : targetParentRow.level + 1
                }
                const newReportRows = targetParentRow === null ?
                    [...props.reportRows, newLine] :
                    [
                        ...props.reportRows.filter((rowF) => rowF.item_order < newLine.item_order),
                        newLine,
                        ...props.reportRows.filter((rowF) => rowF.item_order >= newLine.item_order).map((rowM) => { return { ...rowM, item_order: rowM.item_order + 1, edit_flag: true } })]
                props.setReportRows(newReportRows)
                props.setEditing(true)
                props.setRowInEdit(newLine.row_id)*/
            } else {
                alert("Ne peut pas changer d'item sans sauvegarder")
            }
        } else {
            alert("Choisis une page de rapport pour ajouter des colonne")
        }
    }

    function beginAddColumn() {
        if (props.selection.PartId !== null) {
            if (!props.editing) {
                setNewItemType('col')
                setNewItemModalOpen(true)
                props.setEditing(true)
                /*
                const maxOrder = isFinite(Math.max(...props.reportCols.map((col) => col.column_order))) ? Math.max(...props.reportCols.map((row) => row.column_order)) : 0
                const newCol: FinStateSecColWHelp = {
                    col_id: -1,
                    part_id: props.page.part_id,
                    column_order: targetParentRow === null ? maxOrder + 1 : targetParentRow.item_order + 1,
                    column_desc: '',
                    edit_flag: true,
                    level: targetParentRow === null ? 0 : targetParentRow.level + 1
                }
                const newReportCols = [...props.reportCols, newCol]
                props.setReportCols(newReportCols)
                props.setEditing(true)
                props.setColInEdit(newCol.col_id)*/
            } else {
                alert("Ne peut pas changer d'item sans sauvegarder")
            }
        } else {
            alert("Choisis une page de rapport pour ajouter des colonne")
        }
    }

    function handleDescChange(type: 'row' | 'col', item_id: number, newValue: string) {
        if (type === 'row') {
            const newRows = props.data.rows.map((row) => {
                if (row.row_id === item_id) {
                    return { ...row, row_desc: newValue, edit_flag: true }
                } else {
                    return row
                }
            })
            props.setData.updateRows(newRows)
        }
        if (type === 'col') {
            const newCols = props.data.cols.map((col) => {
                if (col.col_id === item_id) {
                    return { ...col, column_desc: newValue, edit_flag: true }
                } else {
                    return col
                }
            })
            props.setData.updateCols(newCols)
        }
    }
    function handleRowSelect(row_id: number) {
        if (props.editing||!isAdmin) {
            <Alert>
                Ne peut pas changer d'item
            </Alert>
        } else {
            props.setEditing(true)
            props.onChangeLoc.setRowEdit(row_id)
            const editFlag = props.data.rows.map((rowM) => { if (rowM.row_id === row_id) { return { ...rowM, edit_flag: true } } else { return { ...rowM } } })
            props.setData.updateRows(editFlag)
            const parent_id = props.data.rows.find((r) => r.row_id === row_id).parent_id
            setTargetParentRow(parent_id)
        }
    }
    function handleColSelect(col_id: number) {
        if (props.editing||!isAdmin) {
            <Alert>
                Ne peut pas changer d'item
            </Alert>
        } else {
            props.setEditing(true)
            props.onChangeLoc.setColEdit(col_id)
            const editFlag = props.data.cols.map((colM) => { if (colM.col_id === col_id) { return { ...colM, edit_flag: true } } else { return { ...colM } } })
            props.setData.updateCols(editFlag)
        }
    }

    async function handleChangeParent(target: number) {
        if(props.selection.PartId!==null&&props.editing&&props.selection.PartId&&props.selection.PartId){
            const itemToMove=props.data.rows.find((r)=>r.row_id===props.selection.RowEdit)
            if (itemToMove){
                const targetTrue=target===0?null:target
                const newReportRows= await serviceReportRows.changeRowParent(
                    itemToMove.row_id,
                    itemToMove.row_desc,
                    targetTrue,
                    props.selection.PartId)
                if (newReportRows.success){
                    props.forceDataUpdate()
                    props.setEditing(false)
                    props.onChangeLoc.setRowEdit(null)
                    setExpanded(prev => {
                        const next = new Set(prev);
                        next.add(target);
                        return next;
                    });
                }else{
                    alert('erreur lors du changement de parent')
                }
            }else{
                alert('Erreur: je n ai pas trouvé la ligne a modifer')
            }
        }
    }

    function renderRows() {
        return (<>
            {props.data.rows.sort((rs) => rs.item_order).filter((rv)=>isVisible(rv)).map((r) =>
                <TableRow key={r.row_id}
                >
                    <>  
                        <TableCell
                            sx={{ pl: `${(r.level + 1) * 16}px` }}
                        >
                            {r.end_block > r.item_order && !props.editing && (
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
                        {props.editing && r.row_id === props.selection.RowEdit ? <>
                            <TableCell sx={{ backgroundColor: 'AccentColor' }}>
                                <TextField
                                    value={r.row_desc}
                                    onChange={
                                        (e) => handleDescChange(
                                            'row',
                                            r.row_id,
                                            e.target.value)
                                    }
                                />
                            </TableCell>
                            <TableCell sx={{ backgroundColor: 'AccentColor' }}>
                                <Select 
                                    type='select' 
                                    value={props.data.rows.find((rl)=>rl.row_id===r.parent_id)?.row_id??'0'} 
                                    onChange={(e) => handleChangeParent(Number(e.target.value))}
                                    sx={{maxWidth:'100px'}}
                                    >
                                    <MenuItem key={0}>
                                        Aucun
                                    </MenuItem>
                                    {props.data.rows
                                                .filter((curRow) => r.row_id !== curRow.row_id)
                                                .map((listRow) => 
                                                    <MenuItem key={listRow.row_id} value={listRow.row_id}>
                                                        {listRow.row_desc}
                                                    </MenuItem>
                                                )
                                    }
                                </Select>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: 'AccentColor' }}>
                                {r.can_move_up ? <KeyboardArrowUp onClick={handleMoveUp}/> : <></>}
                                <Save onClick={handleSave}/>
                                <Cancel onClick={handleCancel}/>
                                <Delete onClick={handleDelete}/>
                                {r.can_move_down ? <KeyboardArrowDown onClick={handleMoveDown}/> : <></>}
                            </TableCell>
                        </> :
                            <>
                                <TableCell
                                    sx={{ pl: `${(r.level + 1) * 16}px` }}
                                    onClick={() => handleRowSelect(r.row_id)}
                                >
                                    {r.row_desc}
                                </TableCell>
                                <TableCell
                                    onClick={() => handleRowSelect(r.row_id)}
                                >
                                    {props.data.rows.find((rl) => rl.row_id === r.parent_id)?.row_desc ?? ''}
                                </TableCell>
                                {props.editing && props.selection.RowEdit !== r.row_id ? <TableCell></TableCell> : <></>}
                            </>
                        }
                        {props.data.cols.map((row) => <TableCell></TableCell>)}
                    </>
                </TableRow>)}
            {!props.editing &&isAdmin?
                <TableRow>
                    <TableCell
                        colSpan={2}
                    >
                        <Button
                            onClick={beginAddLine}
                        >
                            Ajouter une ligne
                        </Button>
                    </TableCell>
                </TableRow> : <></>}

        </>)
    }

    function renderHeader() {
        return (
            <>
                <TableRow>
                    <TableCell
                        sx={{width:'20px'}}
                    >

                    </TableCell>
                    <TableCell>
                        Poste
                    </TableCell>
                    <TableCell>
                        Parent du poste
                    </TableCell>
                    {props.editing && props.selection.RowEdit !== null ? <TableCell></TableCell> : <></>}
                    {props.data.cols.map((colM) => {
                        return (props.editing && colM.col_id === props.selection.ColEdit ?
                            <>
                                <TableCell
                                    align="right"
                                    key={colM.col_id}
                                    sx={{ backgroundColor: 'AccentColor' }}
                                    onClick={() => handleColSelect(colM.col_id)}
                                >
                                    <TextField value={colM.column_desc} onChange={(e) => handleDescChange('col', colM.col_id, e.target.value)}
                                    />
                                </TableCell>
                            </> : <TableCell
                                onClick={() => handleColSelect(colM.col_id)}
                                align="right"
                            >
                                {colM.column_desc}
                            </TableCell>
                        )
                    }



                    )}
                    {!props.editing&&isAdmin ?
                        <TableCell>
                            <Button
                                onClick={beginAddColumn}
                            >
                                Ajouter une colonne
                            </Button>
                        </TableCell> : <></>}
                </TableRow>
                {
                    props.editing && props.selection.ColEdit !== null ?
                        <TableRow>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                            {props.data.cols.map((r) => {
                                if (r.col_id === props.selection.ColEdit) {
                                    return (<TableCell align='center'>
                                        {r.can_move_left ? <KeyboardArrowLeft onClick={handleMoveLeft}/> : <></>}
                                        <Save onClick={handleSave}/>
                                        <Cancel onClick={handleCancel}/>
                                        <Delete onClick={handleDelete}/>
                                        {r.can_move_right ? <KeyboardArrowRight onClick={handleMoveRight}/> : <></>}
                                    </TableCell>)
                                } else {
                                    return (<TableCell></TableCell>)
                                }
                            })}
                        </TableRow> : <></>
                }
            </>
        )
    }

    return (
    
        <>
            <NewReportPageItemModal
                modalOpen={newItemModalOpen}
                setModalOpen={setNewItemModalOpen}
                itemType={newItemType}
                setItemType={setNewItemType}
                rows={props.data.rows}
                setRows={props.setData.updateRows}
                cols={props.data.rows}
                setCols={props.setData.updateCols}
                reportPage={props.selection.PartId}
                editing={props.editing}
                setEditing={props.setEditing}
            />
            {props.selection.PartId !== null ? <>

                    <Table
                        stickyHeader
                        size='small'
                        sx={{ 
                            width: '100%' ,
                            tableLayout: "fixed",
                        }}
                    >
                        <TableHead>
                            {renderHeader()}
                        </TableHead>
                        <TableBody>
                            {renderRows()}
                        </TableBody>
                    </Table>
            </>
                : <></>}
        </>
    )
}

export default ReportPageCreator