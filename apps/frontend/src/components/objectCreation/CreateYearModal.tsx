import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Input, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { serviceMunicEnt } from "../../services/mun/serviceMunicEntites"
import type { year } from "@budgets_municipaux/common"
import DeleteIcon from '@mui/icons-material/Delete';

interface props{
    open:boolean
    setOpen:Dispatch<SetStateAction<boolean>>
    yearOptions:year[]
    setYear:(newYear:number|null)=>void
}

function CreateYearModal({
    open,setOpen,yearOptions,setYear
}:props){
    const [newYear, setNewYear] = useState<number | "">("");
    const [alertDialogOpen,setAlertDialogOpen] = useState<boolean>(false)
    const [yearToDelete,setYearToDelete]=useState<number|null>(null)

    function handleClose(){
        setOpen(false)
        setAlertDialogOpen(false)
        setYearToDelete(null)
    }
    async function handleYearCreation(){
        if (typeof newYear === "number" && newYear>1950 && newYear<2050) {
            const newYearConf = await serviceMunicEnt.createYear(newYear)
            if (newYearConf.success===true && newYearConf.data.length===1){
                setYear(newYearConf.data[0])
                setOpen(false)
            }else{
                alert('Issue during creation')
            }
        }
    }

    async function handleYearDeletion(){
        if (yearToDelete!==null){
            const deleteConfirm = await serviceMunicEnt.deleteYear(yearToDelete)

            if (deleteConfirm.success===true){
                if (yearOptions.length>1){
                    const yearToSet = yearOptions.findLast((y)=>y.year!==yearToDelete)
                    if(yearToSet){
                        setYear(yearToSet.year)
                    }else{
                        setYear(null)
                    }

                }
                setAlertDialogOpen(false)
                setYearToDelete(null)
            }else{
                alert('Échec de suppression')
            }
        }
    }
    async function handleAlertClose(){
        setAlertDialogOpen(false)
        setYearToDelete(null)
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
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Années existantes
                                </TableCell>
                                <TableCell>
                                    Supprimer
                                </TableCell>
                            </TableRow>
                        
                        </TableHead>
                        <TableBody>
                            {yearOptions.map((row)=>{return (
                                <TableRow>
                                    <TableCell>
                                        {row.year}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={()=>{
                                                setAlertDialogOpen(true)
                                                setYearToDelete(row.year)
                                            }}
                                        >

                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>)})}
                        </TableBody>
                    </Table>
                    <TextField
                        label="Nouvelle année"
                        type="number"
                        fullWidth
                        value={newYear}
                        onChange={(e) => setNewYear(Number(e.target.value))}
                    />
                    <Button
                        onClick={()=>handleYearCreation()}
                    >
                        Ajouter année
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
                            Cette opération supprimera l'année et toutes les données attenantes
                            Êtes vous sur de vouloir faire ça
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleAlertClose} autoFocus>
                            Annuler
                        </Button>
                        <Button onClick={handleYearDeletion}>Supprimer</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Modal>
        </>
    )
}

export default CreateYearModal