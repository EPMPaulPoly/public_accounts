import type { 
    FinStateSecColWHelp, 
    FinStateSecRowWHelp, 
    FinStateSection, 
} from "@budgets_municipaux/common";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import { serviceReportParts } from "../../services/mun/serviceReportParts";
import ChooseReportSection from "../selectors/ChooseReportSection";
import { authClient } from "../../utils/auth-client";


interface props {
    value:{
        selected_part_id:number|null
        new_item_flag:boolean
    }
    options:FinStateSection[]
    onChange:{
        part_id_changer:(part_id:number|null)=>void
        new_flag_changer:(new_part:boolean)=>void
    }
    ResultUpdater:{
        row_changer:(rows:FinStateSecRowWHelp[])=>void,
        col_changer:(cols:FinStateSecColWHelp[])=>void
    },
    setAddReportSectionModalOpen:Dispatch<SetStateAction<boolean>>
}

function ManipReportParts(props: props) {
    const { data: session, isPending } = authClient.useSession();
  
    const isAdmin = session?.user.role === 'admin';
    const [open, setOpen] = useState<boolean>(false)
    function handleClose() {
        setOpen(false)
    }
    async function handleDeletePart() {
        if (props.value.selected_part_id!==null){
            const deletedItem=await serviceReportParts.deleteReportParts(props.value.selected_part_id)
            props.onChange.part_id_changer(null)
            setOpen(false)
        }
    }
    return (
        <>
            <ChooseReportSection
                value={props.value.selected_part_id}
                options={props.options}
                onChange={props.onChange.part_id_changer}
            />
            {isAdmin ? <>
                <Button
                    variant="outlined"
                    onClick={() => {
                        props.onChange.new_flag_changer(true)
                        props.setAddReportSectionModalOpen(true)
                    }}
                >
                    Ajouter Section Rapport
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        props.onChange.new_flag_changer(false)
                        props.setAddReportSectionModalOpen(true)
                    }}
                >
                    Modifier section rapport
                </Button>
                <Button
                    onClick={() => setOpen(true)}
                    variant="outlined"
                >
                    Supprimer Section Rapport
                </Button>
            </> : <></>}
           
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Supprimer?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        La suppression enlèvera toutes les affectatiosn et
                        est forte de conséquences
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Annuler
                    </Button>
                    <Button onClick={handleDeletePart} sx={{ backgroundColor: 'red' }}>Supprimer</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ManipReportParts