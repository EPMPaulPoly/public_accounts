import type { EquationDef, EquationVar } from "@budgets_municipaux/common"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField } from "@mui/material"
import { useEffect, useState } from "react"

interface props{
    values:{
        modalOpen:boolean,
        currentEquation:number|null,
        createFlag:boolean|null
    },
    options:{
        equations:EquationDef[]
        variables:EquationVar[]
    }
    onNew:(eq_name:string)=>Promise<boolean>,
    onUpdate:({eqId, newEqName, newEqExpr}:{eqId:number,newEqName:string,newEqExpr:string})=>Promise<boolean>,
    setModalOpen:(status:boolean)=>void
}
export function CreateMunicIndicatorModal(props:props){
    const [localName,setLocalName]=useState<string>('')
    const [localExpr,setLocalExpr]=useState<string>('')
    const [dialogOpen,setDialogOpen]=useState<boolean>(false)
    const [dialogMessage,setDialogMessage]=useState<string>('')
    useEffect(()=>{
        if(props.values.modalOpen){
            if (props.values.createFlag){
                setLocalName('')
            }else{
                const equationVal= props.options.equations.find((eq)=>eq.eq_id===props.values.currentEquation)
                if(equationVal){
                    setLocalName(equationVal.eq_name)
                    setLocalExpr(equationVal.eq_expression)
                } 
            }
        }
    },[props.values.modalOpen])
    function handleClose(){
        setLocalName('')
        setLocalExpr('')
        props.setModalOpen(false)
    }
    async function handleCreateNew(){
        const success= await props.onNew(localName)
        if (success){
            handleClose()
        }else{
            setDialogMessage('Erreur création indicateurs')
            setDialogOpen(true)
        }
        
    }

    async function handleUpdate(){
        if (props.values.currentEquation){
        const success= await props.onUpdate({eqId:props.values.currentEquation,newEqName:localName,newEqExpr:localExpr})
            if (success){
                handleClose()
            }else{
                setDialogMessage('Erreur modification indicateurs')
                setDialogOpen(true)
            }
        }
    }
    return(
        <>
        <Modal
            open={props.values.modalOpen}
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
                <TextField label='Nom item' value={localName}onChange={(e)=>setLocalName(e.target.value)}/>
                {props.options.variables&& props.options.variables.length>0&&!props.values.createFlag?<>
                    <TextField
                        value={localExpr}
                        onChange={(e)=>setLocalExpr(e.target.value)}
                    />    
                </>:<p>Créer l'équation et les  variables pour éditer la formulation</p>}
                {localName!==''?(props.values.createFlag?
                    <Button
                        variant="outlined"
                        onClick={handleCreateNew}
                    >
                        Créer nouvel indicateur
                    </Button>:
                    <Button
                        variant="outlined"
                        onClick={handleUpdate}
                    >
                        Mettre à jour indicateur {props.options.equations.find((eq)=>eq.eq_id===props.values.currentEquation)?.eq_id}
                    </Button>):<>
                    </>}
            </Box>
        </Modal>
        <Dialog
            open={dialogOpen}
            onClose={()=>setDialogOpen(false)}role="alertdialog"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogMessage}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{setDialogOpen(false);setDialogMessage('')}} autoFocus>
                        Fermer
                    </Button>
                </DialogActions>
            {}
        </Dialog>
        </>
    )
}