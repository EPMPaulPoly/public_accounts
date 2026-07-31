import { Box, Button, Dialog, Modal, TextField } from "@mui/material"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { serviceReportParts } from "../../services/mun/serviceReportParts"
import type { backend_response, FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSection } from "@budgets_municipaux/common"
import { serviceReportRows } from "../../services/mun/serviceReportRows"
import { serviceReportCols } from "../../services/mun/serviceReportCols"
import { useAppContext } from "../../context/contextProvider"

interface props{
    values:{
        modalOpen:boolean,
        reportPageToMod:FinStateSection|null
        newPart:boolean
    },
    onChange:{
        setModalOpen:Dispatch<SetStateAction<boolean>>
        setReportPage:(part_id:number|null)=>void
        setNewPart:(isNewPart:boolean)=>void
    }
}
const sxBox = {
    overflowX: 'hidden',
    overflowY: 'automatic',
    paddingTop: '20px',
    padding: '10px',
    display: 'grid',
    gap: '10px',
    width:'420px'
}


function ModalReportSectionModCreate(props:props){
    const [descSection,setDescSection]=useState<string>('')
    const [secName,setSecName]=useState<string>('')
    const {setSnackMessage,setSnackOpen,setSnackSev}=useAppContext()
    async function handleSectionSave (){
        
        if (!props.values.newPart&&props.values.reportPageToMod!==null&&props.values.reportPageToMod.part_id!==null){
            const returnVal=await serviceReportParts.updateReportPart(props.values.reportPageToMod.part_id,descSection,secName)
            if (returnVal.success&&returnVal.data){
                props.onChange.setReportPage(props.values.reportPageToMod.part_id)
                props.onChange.setModalOpen(false)
            }else if(returnVal.success===false){
                setSnackMessage('erreur en modifiant une section')
                setSnackSev('error')
                setSnackOpen(true)
            }
        }else if (props.values.newPart){
            const returnVal = await serviceReportParts.createNewPart(descSection,secName)
            if (returnVal.success===true&&returnVal.data){
                props.onChange.setReportPage(returnVal.data[0].part_id)
                props.onChange.setModalOpen(false)
            }else if(returnVal.success===false){
                setSnackMessage('erreur en créant une nouvelle section')
                setSnackSev('error')
                setSnackOpen(true)
            }
        }else{
            setSnackMessage("Combinaison invalide d'intrants")
            setSnackSev('error')
            setSnackOpen(true)
        }
    }
    // When the modal opens set the valus of the requiired fields.
    useEffect(()=>{
        if (props.values.newPart){// if it's a new part, set the local descriptions to be empty
            setDescSection('')
            setSecName('')
        }else{// if it already exists, set the values to the required fields which are handled locally
            if (props.values.reportPageToMod!==null){
                setDescSection(props.values.reportPageToMod.part_desc)
                setSecName(props.values.reportPageToMod.part_page_def)
            }
        }
    },[props.values.modalOpen])
    return (
        <>
            <Dialog
                open={props.values.modalOpen}
                onClose={()=>{
                    props.onChange.setModalOpen(false)
                    props.onChange.setNewPart(false)
                    setDescSection('')
                    setSecName('')
                }}
            >
                <Box sx={sxBox}>
                    <TextField label='Description section' value={descSection} onChange={(e)=>setDescSection(e.target.value)}/>
                    <TextField label='Identifiant section' value={secName} onChange={(e)=>setSecName(e.target.value)}/>
                    <Button
                        variant="outlined"
                        onClick={handleSectionSave}
                    >
                        {props.values.newPart?'Ajouter la section':`Modifier la section ${props.values.reportPageToMod?.part_id}`}
                    </Button>
                </Box>
            </Dialog>
        </>
    )
}

export default ModalReportSectionModCreate