
import { 
    Box, 
    Button, 
    Dialog, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TablePagination, 
    TableRow, TextField } from "@mui/material"
import { useState, type Dispatch, type SetStateAction } from "react"
import { type ProvincialDataId, type backend_response, type FinStateAssignGrid } from "@budgets_municipaux/common"

import { serviceReportAssign } from "../../services/mun/serviceReportAssign"
import {getAssignFromGrid} from '../../utils/gridSearch'
import { useAppContext } from "../../context/contextProvider"

interface props {
    selection:{
        modalOpen: boolean,
        rowId: number | null,
        colId: number | null,
        year: number | null
        rowPerPage: number,
        reportPage: number | null
        tablePage: number |null
        selectedCode: string | null
        totalCount: number|null,
        codeStart: string,
    }
    options:{
        codeOptions: ProvincialDataId[]
    }
    onChange:{
        setRowId:(newRid:number|null)=>void
        setColId: (newCid:number|null)=>void
        setModalOpen: (newM:boolean)=>void
        setTablePage: (newTP:number)=>void
        setRowsPerPage:(newRpp:number)=>void
        setSelectedCode:(newCod:string|null)=>void
        setCodeStart: (newCst:string)=>void
    }
    data:FinStateAssignGrid[]|null
    setData:(NewGrid:FinStateAssignGrid[])=>void
}
const sxBox = {
    overflowX: 'hidden',
    overflowY: 'automatic',
    paddingTop: '20px',
    padding: '10px',
    display: 'grid',
    gap: '10px',
    width: '420px'
}

/**
 * this is a modal which is used to create or modify new assignments between the proviancial code
 * and a location in the financial statemts
 * @param props a complec properties setup listed at the head of the file with various setters and data
 * @returns a MUI moda window
 */
function ModalProvIdAssign(props: props) {
    const [localCodeStart,setLocalCodeStart]=useState<string>('')
    const {setSnackOpen,setSnackMessage,setSnackSev}=useAppContext()
    async function handleSectionSave() {
        try {
            const matchId = getAssignFromGrid(props.data,props.selection.rowId, props.selection.colId)
            let data: backend_response<FinStateAssignGrid[]> = { success: false }
            if (
                matchId === null
            ) {// new assign case
                if (
                    props.selection.year !== null &&
                    props.selection.reportPage !== null &&
                    props.selection.rowId !== null &&
                    props.selection.colId !== null &&
                    props.selection.selectedCode !== null
                ) {
                    data = await serviceReportAssign.newReportAssign(
                        props.selection.rowId,
                        props.selection.colId,
                        props.selection.year,
                        props.selection.reportPage,
                        props.selection.selectedCode
                    )
                }else{
                    throw new Error("un de paramètres requis n'est pas valide")
                }
            } else {//update case
                if (
                    props.selection.year !== null &&
                    props.selection.reportPage !== null &&
                    props.selection.rowId !== null &&
                    props.selection.colId !== null &&
                    props.selection.selectedCode !== null &&
                    typeof matchId === 'number'
                ) {
                    data = await serviceReportAssign.updateReportAssign(
                        matchId,
                        props.selection.rowId,
                        props.selection.colId,
                        props.selection.year,
                        props.selection.reportPage,
                        props.selection.selectedCode
                    )
                }else{
                    throw new Error("un de paramètres requis n'est pas valide")
                }
            }
            if (data.success && data.data) {//if success
                props.setData(data.data)
                props.onChange.setModalOpen(false)
                props.onChange.setRowId(null)
                props.onChange.setColId(null)
                props.onChange.setSelectedCode('')
            } else {
                throw new Error("Affectation echouée dans l'api")
             }
        } catch (error: any) {
            setSnackMessage(`Erreur:${error.message}`)
            setSnackSev('error')
            setSnackOpen(true)
        }

    }

    async function handleIdSearch() {
        props.onChange.setCodeStart(localCodeStart)
    }
    const handlePageChange = async (newPage: number) => {
        props.onChange.setTablePage(newPage)
    }
    function handleCellClick(prov_id: string | null) {
        props.onChange.setSelectedCode(prov_id)
        /* To do select code to insert*/
    }
    const handleChangeRowsPerPage = async (rows: number) => {
        props.onChange.setRowsPerPage(rows)
        /* To do get first possible options*/
    }  
    
    return (
        <>
            <Dialog
                open={props.selection.modalOpen}
                onClose={() => { props.onChange.setModalOpen(false); 
                    props.onChange.setRowId(null); 
                    props.onChange.setColId(null); 
                    props.onChange.setSelectedCode(null) }}
            >
                <Box sx={sxBox}>
                    <TextField 
                        label='Recherche code' 
                        value={localCodeStart} 
                        onChange={(e) => setLocalCodeStart(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                            e.preventDefault(); // Optional: prevents form submission/newline
                            handleIdSearch();
                            }
                        }}
                    />
                    <Button
                        variant="outlined"
                        onClick={handleIdSearch}
                    >
                        Rechercher des codes
                    </Button>
                    <TableContainer >
                        <Table
                            stickyHeader
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Code Provincial
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.options.codeOptions &&
                                    props.options.codeOptions.map((row) => (

                                        <TableRow key={row.prov_rep_id}>
                                            <TableCell
                                                onClick={() => handleCellClick(row.prov_rep_id)}
                                            >
                                                {row.prov_rep_id}
                                            </TableCell>
                                        </TableRow>

                                    )

                                    )
                                }
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={props.selection.totalCount??0}
                            page={props.selection.tablePage??0}
                            rowsPerPage={props.selection.rowPerPage}
                            onPageChange={(e, newPage) => handlePageChange(newPage)}
                            onRowsPerPageChange={(e) => {
                                handleChangeRowsPerPage(parseInt(e.target.value, 10));
                            }}
                        />
                    </TableContainer>
                    {props.selection.selectedCode !== null ?
                        <p>
                            Association: M
                            {getAssignFromGrid(props.data, props.selection.rowId, props.selection.colId) === null
                                ? 'SV'
                                : getAssignFromGrid(props.data, props.selection.rowId, props.selection.colId) }
                            {' - '}A{props.selection.year}
                            {' - '}L{props.selection.rowId}
                            {' - '}C{props.selection.colId}
                            {' - '}
                            {props.selection.selectedCode}
                        </p> : <>
                        </>
                    }
                    {props.selection.selectedCode !== null ? <>
                        <Button
                            variant='outlined'
                            onClick={() => handleSectionSave()}
                        >
                            Sauvegarder
                        </Button></> : <>

                    </>}
                </Box>
            </Dialog>
        </>
    )
}

export default ModalProvIdAssign