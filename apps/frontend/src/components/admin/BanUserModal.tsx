import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material"
import { useState, type Dispatch, type SetStateAction } from "react"
import { useAppContext } from "../../context/contextProvider"

interface BUMProps{
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>
    currentId:string|null
    onBan:(userId:string,reason:string,time:number)=>Promise<boolean>
    setCurrentId:(newId:string|null)=>void
}

function BanUserModal(props:BUMProps){
    const [units,setUnits] = useState<number>(60)
    const [time,setTime] = useState<number>(0)
    const [reason,setReason] = useState<string>('Disruption équations')
    const {setSnackMessage,setSnackSev,setSnackOpen}=useAppContext()
    function handleClose(){
        props.setOpen(false)
    }
    async function handleBan(){
        if (props.currentId){
            const success = await props.onBan(props.currentId,reason,time*units)
            if (success){
                props.setCurrentId(null)
                setSnackMessage('Banissement réussi')
                setSnackSev('info')
                setSnackOpen(true)
                handleClose()
            }
            else{
                setSnackMessage('Banissement échoué')
                setSnackSev('error')
                setSnackOpen(true)
            }
        }else{
            setSnackMessage('Identifiant non reconnu')
                setSnackSev('error')
                setSnackOpen(true)
        }
    }
    return(<>
        <Modal
            open={props.open}
            onClose={handleClose}
        >
            <Box
                sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
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
                <TextField type='text' label='Raison' value={reason} onChange={(e)=>setReason(e.target.value)}/>
                <TextField type='number' label='Durée' value={time} onChange={(e)=>setTime(Number(e.target.value))}/>
                <FormControl>
                    <InputLabel>
                        Unité de temps
                    </InputLabel>
                    <Select
                        value={units}
                        onChange={(e)=>setUnits(e.target.value)}
                        labelId="Unité de temps"
                    >    
                        <MenuItem
                            key={0}
                            value={60}
                        >
                            Minutes
                        </MenuItem>
                        <MenuItem
                            key={1}
                            value={3600}
                        >
                            Heures
                        </MenuItem>
                        <MenuItem
                            key={2}
                            value={3600*24}
                        >
                            Jours
                        </MenuItem>
                        <MenuItem
                            key={3}
                            value={3600*24*31}
                        >
                            Mois
                        </MenuItem>
                    </Select>
                </FormControl>
                <Button
                    onClick={handleBan}
                >
                    Banir usager 
                </Button>
            </Box>
        </Modal>
    </>)
}

export default BanUserModal