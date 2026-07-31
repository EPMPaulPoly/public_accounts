import type { FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSection } from "@budgets_municipaux/common";
import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import  { serviceReportRows } from "../../services/mun/serviceReportRows";
import { serviceReportCols } from "../../services/mun/serviceReportCols";
import { useAppContext } from "../../context/contextProvider";

interface props{
    modalOpen:boolean
    setModalOpen:Dispatch<SetStateAction<boolean>>
    itemType:'row'|'col'|null
    setItemType:Dispatch<SetStateAction<'row'|'col'|null>>
    rows:FinStateSecRowWHelp[],
    setRows:Dispatch<SetStateAction<FinStateSecRowWHelp>>
    cols:FinStateSecColWHelp[],
    setCols:Dispatch<SetStateAction<FinStateSecColWHelp>>
    reportPage:number|null
    editing:boolean
    setEditing:Dispatch<SetStateAction<boolean>>
}

export function NewReportPageItemModal(props:props){
    const [newItemName,setNewItemName]=useState<string>('')
    const [newItemParent,setNewItemParent]=useState<number|null>(null)
    const {setSnackMessage,setSnackSev,setSnackOpen}=useAppContext()
    async function handleCreate(){
        if (props.itemType==='row'&&props.reportPage!==null){
            const data = await serviceReportRows.newLine(newItemName,props.reportPage,newItemParent)
            if (data.success){
                props.setRows(data.data)
                handleClose()
            }else{
                setSnackMessage("Échec lors de la création d'une nouvel ligne")
                setSnackSev('error')
                setSnackOpen(true)
            }
        }
        if (props.itemType==='col'&&props.reportPage!==null){
            const data = await serviceReportCols.newCol(newItemName,props.reportPage)
            if (data.success){
                props.setCols(data.data)
                handleClose()
            }else{
                setSnackMessage("Échec lors de la création d'une nouvel colonne")
                setSnackSev('error')
                setSnackOpen(true)
            }
        }
    }
    function handleClose(){
        props.setEditing(false)
        props.setModalOpen(false)
        props.setItemType(null)
        setNewItemName('')
        setNewItemParent(null)
    }
    return(
        <Modal
            open={props.modalOpen}
            onClose={handleClose}
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
                <TextField label='Nom item' onChange={(e)=>setNewItemName(e.target.value)}/>
                {props.itemType==='row'?
                    <Select
                        value={newItemParent!==null?newItemParent:'0'}
                        onChange={(e)=>e.target.value!=='0'?setNewItemParent(Number(e.target.value)):setNewItemParent(null)}
                    >
                        <MenuItem
                            value={'0'}
                        >
                            Aucun
                        </MenuItem>
                        {props.rows.map((r)=>{
                            return(
                                <MenuItem
                                    value={r.row_id}
                                >
                                    {r.row_desc}
                                </MenuItem>
                            )
                        })}
                    </Select>:
                    <></>
                }
                <Button
                    variant="outlined"
                    onClick={handleCreate}
                >
                     Créer nouvel item
                </Button>
            </Box>
        </Modal>
    )
}