import type { IndicatorConstant } from "@budgets_municipaux/common";
import { Delete } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction } from "@mui/material";
import { useAuth } from "../../context/authProvider";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useAppContext } from "../../context/contextProvider";



interface CContsProps {
    selection: {
        constantSel: number | null
    },
    options: {
        constants: IndicatorConstant[]
    },
    onAction: {
        setConstantSelect: (newConstId: number | null) => void
        createNewConstant: () => Promise<void>
        deleteConstant: (constToDelete: number) => Promise<boolean>
    }

}

export function ChooseConstant(props: CContsProps) {
    const { session } = useAuth()
    const [deleteDialogOpen, setDelDialogOpen] = useState<boolean>(false);
    const [deleteId,setDeleteId]=useState<number|null>(null);

    const { setSnackOpen, setSnackSev, setSnackMessage } = useAppContext()
    async function handleDelete(
        id: number | null
    ) {
        if (id !== null) {

            const res = await props.onAction.deleteConstant(id)
            if (res === true) {
                setDeleteId(null)
                props.onAction.setConstantSelect(null)
                setDelDialogOpen(false)
                setSnackMessage('Suppression réussie')
                setSnackSev('success')
                setSnackOpen(true)
            } else {
                setSnackMessage('Suppression échouée')
                setSnackSev('error')
                setSnackOpen(true)
            }
        } else {
            setSnackMessage('Identifiant invalide, veuillez rééssayer')
            setSnackSev('error')
            setSnackOpen(true)
        }
    }

    return (
        <div
            style={{ 
                width: '20vw', 
                display:'flex',
                flexDirection:'column',
                overflow:'hidden',
            }}
        >
            {session?.user.role==='admin'||session?.user.role==='user' ?
            <Button
                variant='outlined'
                onClick={() => props.onAction.createNewConstant()}
            >
                Créer une nouvelle constante
            </Button>:<></>}
            <List
                style={{
                    flex:1,
                    overflowY:'auto'
                }}
                onClick={()=>props.onAction.setConstantSelect(null)}
                dense={true}
            >
                {props.options.constants.map((con) =>
                    <ListItemButton
                        key={con.const_id}
                        onClick={(e) => {e.stopPropagation();props.onAction.setConstantSelect(con.const_id)}}
                        selected={props.selection.constantSel === con.const_id}
                    >

                        <ListItem
                            aria-label={`Select constant ${con.constant_desc} - id :${con.const_id}`}
                        >
                            {con.constant_desc}
                        </ListItem>
                        {session?.user.role==='admin'||session?.user.role==='user' ?
                            <ListItemSecondaryAction>
                                <IconButton 
                                    edge="end" 
                                    aria-label={`delete ${con.constant_desc}`}
                                    onClick={()=>handleDeleteStart(con.const_id,setDelDialogOpen,setDeleteId)}
                                >
                                    <Delete 
                                    />
                                </IconButton>
                            </ListItemSecondaryAction> : <></>
                        }
                    </ListItemButton>
                )}
            </List>
            <Dialog
                open={deleteDialogOpen}
            >
                <DialogTitle>
                    Êtes-vous sur?
                </DialogTitle>
                <DialogContent>
                    La suppression de la constante mènera à sa suppression dans l'ensemble des équations qui l'utilisent.
                    Êtes vous certains de vouloir la supprimer?
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => handleDeleteCancel(setDeleteId,setDelDialogOpen)}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="outlined"
                        style={{ backgroundColor: 'red' }}
                        onClick={()=>handleDelete(deleteId)}
                    >
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>


    )
}

function handleDeleteCancel(
    setDeleteId:Dispatch<SetStateAction<number|null>>,
    setDialogOpen:Dispatch<SetStateAction<boolean>>
){
    setDeleteId(null)
    setDialogOpen(false)
}



function handleDeleteStart(
    id:number,
    setDialogOpen:Dispatch<SetStateAction<boolean>>,
    setDeleteId:Dispatch<SetStateAction<number|null>>
){
    setDeleteId(id)
    setDialogOpen(true)
}
