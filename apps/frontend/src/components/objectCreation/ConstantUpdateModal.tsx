import type { IndicatorConstant } from "@budgets_municipaux/common"
import { 
    Box, 
    Button, 
    FormLabel, 
    Modal, 
    TextField 
} from "@mui/material"
import { 
    useEffect, 
    useState, 
    type Dispatch, 
    type SetStateAction 
} from "react"
import { useAppContext } from "../../context/contextProvider"


interface CUMProp{
    values:{
        selectedConst:number|null,
        modalOpen:boolean,
    },
    onAction:{
        setModalOpen:Dispatch<SetStateAction<boolean>>,
        saveConstant:(constUpdate:IndicatorConstant)=>Promise<boolean>,
        forceUpdate:()=>Promise<void>
    },
    data:{
        constEdit:IndicatorConstant|null
    }
}

export function ConstantUpdateModal(props:CUMProp){
    useEffect(()=>{
        if (props.values.modalOpen===true&&props.data.constEdit!==null){
            setLocalCopy(props.data.constEdit)
        }else{
            setLocalCopy(null)
        }
    },[props.values.modalOpen])

    async function handleClose(
        setModalOpen: Dispatch<SetStateAction<boolean>>,
        setLocalCopy: Dispatch<SetStateAction<IndicatorConstant | null>>,
        forceUpdate: () => Promise<void>
    ) {
        await forceUpdate()
        setModalOpen(false)
        setLocalCopy(null)
    }

    async function handleSave(
        localCopy:IndicatorConstant|null, 
        saver:(constUpdate:IndicatorConstant)=>Promise<boolean>,
        setSnackOpen:Dispatch<SetStateAction<boolean>>,
        setSnackSev:Dispatch<SetStateAction<"error" | "info" | "success" | "warning" | undefined>>,
        setSnackMessage:Dispatch<SetStateAction<string>>,
        setModalOpen:Dispatch<SetStateAction<boolean>>,
        setLocalCopy:Dispatch<SetStateAction<IndicatorConstant|null>>,
        forceUpdate:()=>Promise<void>
    ){
        if (localCopy!==null){
            const res = await saver(localCopy)
            if (res===true){
                setSnackMessage('Successful update')
                setSnackSev('success')
                setSnackOpen(true)
                await handleClose(setModalOpen,setLocalCopy,forceUpdate)
            }else{
                setSnackMessage('Erreur lors de la mise à jour')
                setSnackSev('error')
                setSnackOpen(true)
            }
        }
    }

    const [localCopy,setLocalCopy] = useState<IndicatorConstant|null>(null)
    const {setSnackOpen,setSnackSev,setSnackMessage}=useAppContext()
    return(
        <Modal
            open={props.values.modalOpen}
            onClose={()=>handleClose(props.onAction.setModalOpen,setLocalCopy,props.onAction.forceUpdate)}
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
                <FormLabel>
                    Modification constante id: {localCopy?.const_id}
                </FormLabel>
                <TextField
                    aria-label="Description"
                    label="Description"
                    value={localCopy?.constant_desc}
                    onChange={(e)=>handleLocalChange(e.target.value,'constant_desc',setLocalCopy)}
                />
                <TextField
                    aria-label="Valeur par défaut" 
                    label="Valeur par défaut"
                    type='number'
                    value={localCopy?.default_value}
                    onChange={(e)=>handleLocalChange(Number(e.target.value),'default_value',setLocalCopy)}
                />
                <TextField
                    aria-label="Année de référence" 
                    label="Année de référence"
                    value={localCopy?.index_year}
                    type='number'
                    onChange={(e)=>handleLocalChange(Number(e.target.value),'index_year',setLocalCopy)}
                />
                <TextField
                    aria-label="Symbole" 
                    label="Symbole"
                    value={localCopy?.symbol}
                    onChange={(e)=>handleLocalChange(e.target.value,'symbol',setLocalCopy)}
                />
                <Button
                    variant='outlined'
                    onClick={()=> handleSave(
                        localCopy,
                        props.onAction.saveConstant,
                        setSnackOpen,
                        setSnackSev,
                        setSnackMessage,
                        props.onAction.setModalOpen,
                        setLocalCopy,
                        props.onAction.forceUpdate
                    )}
                >
                    Sauvegarder changements
                </Button>
            </Box>
        </Modal>
    )
}




function handleLocalChange(
    value: number | string,
    field: keyof IndicatorConstant,
    setter: Dispatch<SetStateAction<IndicatorConstant | null>>,
) {
    setter(selection => {
        if (selection === null) return null;
        return {
            ...selection,
            [field]: value
        };
    });
}
