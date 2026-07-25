import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, Input, InputLabel, MenuItem, Modal, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { serviceMunicEnt } from "../../services/mun/serviceMunicEntites"
import type { year } from "@budgets_municipaux/common"
import DeleteIcon from '@mui/icons-material/Delete';
import { Form } from "react-router-dom";
import { serviceReportAssign } from "../../services/mun/serviceReportAssign";

interface props{
    open:boolean
    setOpen:Dispatch<SetStateAction<boolean>>
    yearOptions:year[]
}

function CopyAssignmentsModal({
    open,setOpen,yearOptions
}:props){
    const [yearToCopy, setYearToCopy] = useState<number | null>(null);

    const [yearToSeed, setYearToSeed] = useState<number | null>(null);
    const [alertDialogOpen,setAlertDialogOpen] = useState<boolean>(false)
    const [successDialogOpen,setSuccessDialogOpen]=useState<boolean>(false)
    const [failDialogOpen,setFailDialogOpen]=useState<boolean>(false)

    function handleClose(){
        setOpen(false)
        setAlertDialogOpen(false)
        setYearToCopy(null)
        setYearToSeed(null)
    }


    async function handleCopyWarning(){
        setAlertDialogOpen(true)
    }
    async function handleAlertClose(){
        setAlertDialogOpen(false)
        setSuccessDialogOpen(false)
        setFailDialogOpen(false)
        setOpen(false)
    }
    async function handleCopy(){
        if(yearToCopy!==null&& yearToSeed!==null){
            const data= await serviceReportAssign.copyAssignmentsFromTo(yearToCopy,yearToSeed)
            if (data.success){
                setSuccessDialogOpen(true)
            }else{
                setFailDialogOpen(true)
            }
        }
    }
    function handleCopyYearChange(year:number){
        if(year!==0){
            setYearToCopy(year)
        }else{
            setYearToCopy(null)
        }
    }
    function handleReceiveYearChange(year: number) {

        if (year !== Number('0')) {
            setYearToSeed(year)
        } else {
            setYearToSeed(null)
        }
    }
    return(
        <>
            <Modal
                open={open}
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
                    <FormControl>
                        <InputLabel id="copy-year-label">Année à copier</InputLabel>
                    <Select
                        label='Année à copier'
                        labelId="copy-year-label"
                        value={yearToCopy!==null?yearToCopy:0}
                        onChange={(e)=>handleCopyYearChange(Number(e.target.value))}
                    >
                        <MenuItem
                            value={0}
                        >       
                            Choisissez une année 
                        </MenuItem>
                        {yearOptions.map((y)=>

                                <MenuItem
                                    value={y.year}
                                >
                                    {y.year}
                                </MenuItem>

                        )}
                    </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="seed-year-label">Année à ensemencer</InputLabel>
                    <Select
                        label='Année à ensemencer'
                        labelId="seed-year-label"
                        value={yearToSeed!==null?yearToSeed:0}
                        onChange={(e)=>handleReceiveYearChange(Number(e.target.value))}
                    >
                        <MenuItem
                            value={0}
                        >       
                            Choisissez une année 
                        </MenuItem>
                        {yearOptions.map((y)=>

                                <MenuItem
                                    value={y.year}
                                >
                                    {y.year}
                                </MenuItem>

                        )}
                    </Select>
                    </FormControl>
                    <Button
                        onClick={()=>handleCopyWarning()}
                    >
                        Copier affectations
                    </Button>
                    <Dialog
                        open={alertDialogOpen}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        role="alertdialog"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Êtes vous-sur?"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Cette opération supprimera les affectations dans l'année 
                            qui reçoit les donnes êtes vous sur de vouloir compléter 
                            l'opération? Genre vraiment très sur?????
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleAlertClose} autoFocus>
                            Annuler
                        </Button>
                        <Button onClick={handleCopy} sx={{backgroundColor:'red'}}>Déplacer les données</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={successDialogOpen}
                        onClose={handleAlertClose}
                        aria-labelledby="success-dialog"
                        aria-describedby="success"
                        role="dialog"
                    >
                        <DialogTitle id="success-failure">
                        {"Succès"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Succès. Les données ont été copiées
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleAlertClose} autoFocus>
                            Annuler
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={failDialogOpen}
                        onClose={()=>setFailDialogOpen(false)}
                        aria-labelledby="fail-dialog"
                        aria-describedby="fail"
                        role="dialog"
                    >
                        <DialogTitle id="failure">
                        {"Échec"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Échec!!!!
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleAlertClose} autoFocus>
                            Fermer
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Modal>
        </>
    )
}

export default CopyAssignmentsModal