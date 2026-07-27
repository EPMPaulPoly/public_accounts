import { Box, Button, Modal } from "@mui/material"
import type { UserWithRole } from "better-auth/plugins"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import UserRoleWidget from "../userInputs/UserRoleWidget"

interface MURMProps{
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>
    currentUser:UserWithRole&{username?:string}|null
    onSave:(newRole:string)=>Promise<boolean>
}

function ModUserRoleModal(props:MURMProps){
    const [role,setRole] = useState<'admin'|'user'>('user')
    useEffect(()=>{
        if (props.open){
            const current =props.currentUser?.role==='user'||props.currentUser?.role==='admin'?props.currentUser.role:'user' as 'user'|'admin' 
            setRole(current)
        }
    },[props.open])

    async function handleRoleChangeSave (){
        const success = await props.onSave(role)
        if (success){
            props.setOpen(false)
        }else{alert('Échec lors du changement de rôle')}
    }

    function handleRoleChange(newRole:string){
        if (newRole==='admin'||newRole==='user'){
            setRole(newRole)
        }
    }

    function handleClose(){
        props.setOpen(false)
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
                    <UserRoleWidget
                        value={role}
                        onChange={handleRoleChange}
                    />
                    {
                        role?
                        <Button
                            onClick={handleRoleChangeSave}
                            variant="outlined"
                        >
                            Modifier rôle usager {props.currentUser?.username??'sans Nom de code'}
                        </Button>:<></>
                    }
                    
                </Box>
            </Modal>
    </>)
}

export default ModUserRoleModal