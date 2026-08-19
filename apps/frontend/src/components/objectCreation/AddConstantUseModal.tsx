import type { backend_response, IndicatorConstant } from "@budgets_municipaux/common"
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { useAppContext } from "../../context/contextProvider"
import { serviceConstants } from "../../services/common/serviceConstants"
import { serviceIndicatorEquation } from "../../services/mun/serviceMunicIndicators"


const ROWS_PER_PAGE=10

interface ACUMProps{
    selection:{
        eq_id:number|null,
        addConstantModalOpen:boolean
    },
    onAction:{
        setAddConstantModalOpen:Dispatch<SetStateAction<boolean>>
        forceUpdate:()=>Promise<void>
    }
}

export function AddConstantUseModal(props:ACUMProps){
    const [filterCriteria,setFilterCriteria]=useState<'description'|'symbol'>('description')
    const [filterString,setFilterString]=useState<string>('')
    const [constantOptions,setConstantOptions]=useState<IndicatorConstant[]>([])
    const [optionsCount,setOptionsCount]=useState<number>(0)
    const [tablePage,setTablePage]=useState<number>(0)
    const [selectedConstant,setSelectedConstant]=useState<number|null>(null);
    const { setSnackSev, setSnackMessage, setSnackOpen } = useAppContext()

    useEffect(() => {
        const fetchData = async () => {
            if (props.selection.addConstantModalOpen) {
                await getConstantOptions(setConstantOptions, setOptionsCount, tablePage, filterCriteria, filterString, ROWS_PER_PAGE)
            } else {
                setTablePage(0)
                await getConstantOptions(setConstantOptions, setOptionsCount, 0, filterCriteria, filterString, ROWS_PER_PAGE)
            }
        }
        fetchData()
    }, [props.selection.addConstantModalOpen])


    function handleClose(setAddConstantModalOpen: Dispatch<SetStateAction<boolean>>) {
        setAddConstantModalOpen(false)
        setSelectedConstant(null)
    }
    async function handlePageChange(setConstantOptions: Dispatch<SetStateAction<IndicatorConstant[]>>,
        setOptionCount: Dispatch<SetStateAction<number>>,
        setPage: Dispatch<SetStateAction<number>>,
        page: number,
        searchParameter: 'description' | 'symbol',
        searchValue: string
    ) {
        setPage(page)
        await getConstantOptions(setConstantOptions, setOptionCount, page, searchParameter, searchValue, ROWS_PER_PAGE)
    }
    async function handleSearch(){
        setTablePage(0)
        await getConstantOptions(setConstantOptions,setOptionsCount,0,filterCriteria,filterString,ROWS_PER_PAGE)
    }
    async function getConstantOptions(
        setConstantOptions: Dispatch<SetStateAction<IndicatorConstant[]>>,
        setCount: Dispatch<SetStateAction<number>>,
        page: number,
        searchParameter: 'description' | 'symbol',
        searchValue: string,
        rowsPerPage: number
    ) {
        try {
            const limit = rowsPerPage;
            const offset = page * rowsPerPage
            let result: backend_response<IndicatorConstant[]> = { success: false, data: [] }
            if (searchValue !== '') {
                if (searchParameter === 'description') {
                    result = await serviceConstants.getConstants({ limit: limit, offset: offset, description_like: searchValue })
                } else if (searchParameter === 'symbol') {
                    result = await serviceConstants.getConstants({ limit: limit, offset: offset, symbol_like: searchValue })
                }
            } else {
                result = await serviceConstants.getConstants({ limit: limit, offset: offset })
            }
            if (result.success && result.data && result.total !== undefined) {
                setConstantOptions(result.data ?? [])
                setCount(result.total ?? 0)
            } else {
                throw new Error(`Error retrieving data : ${result.message !== undefined ? result.message : 'Unknown error'}`)
            }
        } catch (error: any) {
            setSnackMessage(`Error retrieving options : ${error.message}`)
            setSnackSev('error')
            setSnackOpen(true)
        }
    }
    async function handleAddConstantUse(){
        if (selectedConstant!==null&&props.selection.eq_id!==null){
            const result= await serviceIndicatorEquation.addConstantUse(props.selection.eq_id,selectedConstant)
            if (result.success){
                props.onAction.forceUpdate()

                setSnackMessage(`La constante a été associée à l'équation. Modifiez la définition`)
                setSnackSev('success')
                setSnackOpen(true)
                handleClose(props.onAction.setAddConstantModalOpen)
            }else{
                setSnackMessage(`Erreur de création d'utilisation de constante: ${result.message}`)
                setSnackSev('error')
                setSnackOpen(true)
            }
        }
    }
    return (
        <Modal
            open={props.selection.addConstantModalOpen}
            onClose={()=>handleClose(props.onAction.setAddConstantModalOpen)}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    outline: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <FormControl>
                    <InputLabel
                        id='select-filter-criteria-label'
                    >
                        Critère Filtre
                    </InputLabel>
                    <Select
                        id="selection-critere-filter"
                        labelId='select-filter-criteria-label'
                        label='Critère filtre'
                        value={filterCriteria}
                        onChange={(e)=>e.target.value==='description'||e.target.value==='symbol'?setFilterCriteria(e.target.value):e}
                        
                    >
                        <MenuItem
                            key='description'
                            value='description'
                        >   
                            Description                        
                        </MenuItem>
                        <MenuItem
                            key='symbol'
                            value='symbol'
                        >   
                            Symbole
                        </MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    value={filterString}
                    onChange={(e)=>setFilterString(e.target.value)}
                    onKeyDown={(e)=>{if (e.key==='Enter'){
                            handleSearch()
                        }}}
                />
                <Button
                    onClick={()=>handleSearch()}
                    variant="outlined"
                    onKeyDown={(e)=>{if(e.key==='Enter')handleSearch()}}
                >
                    Recherche
                </Button>
                
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Symbole
                                </TableCell>
                                <TableCell>
                                    Description
                                </TableCell>
                                <TableCell>
                                    Valeur
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {constantOptions.map((cst,index)=>
                                <TableRow key={cst.const_id}
                                    tabIndex={index}
                                    onClick={()=>setSelectedConstant(cst.const_id)}
                                    hover
                                    sx={{
                                        cursor: "pointer",
                                        "&:focus": {
                                            outline: "2px solid",
                                            outlineOffset: "-2px",
                                        },
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setSelectedConstant(cst.const_id);
                                        }
                                    }}
                                >
                                    <TableCell>
                                        {cst.symbol}
                                    </TableCell>
                                    <TableCell>
                                        {cst.constant_desc}
                                    </TableCell>
                                    <TableCell>
                                        {cst.default_value}
                                    </TableCell>
                                </TableRow>)
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                        count={optionsCount}
                        page={tablePage}
                        onPageChange={(e,newPage:number)=>{handlePageChange(setConstantOptions,setOptionsCount,setTablePage,newPage,filterCriteria,filterString);e}}
                        rowsPerPage={ROWS_PER_PAGE}
                        rowsPerPageOptions={[ROWS_PER_PAGE]}
                    />

                    
                </TableContainer>
                <p>Constante sélectionnée: {selectedConstant!==null?selectedConstant:'S/V'}</p>
                <Button
                    variant="outlined"
                    disabled={selectedConstant===null}
                    onClick={handleAddConstantUse}
                >
                    Créer utilisation
                </Button>
            </Box>
        </Modal>
    )
}




