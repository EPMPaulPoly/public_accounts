import { Box, Button, Modal} from "@mui/material"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import UserInfoWidget from "../userInputs/UserInfoWidget"
import { useAuth } from "../../context/authProvider"
import { authClient } from "../../utils/auth-client"

interface UCIMProps{
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>
    setSnackOpen:Dispatch<SetStateAction<boolean>>
    setSnackMessage:Dispatch<SetStateAction<string>>
    setSnackSev:Dispatch<SetStateAction<("success" | "info" | "warning" | "error") | undefined>>
}

function UserChangeInfoModal(props:UCIMProps){
    const {session,refreshSession}=useAuth()
    const [localUsername,setLocalUsername] = useState<string>('')
    const [localName,setLocalName] = useState<string>('')
    const [localEmail,setLocalEmail] = useState<string>('')
    
    useEffect(()=>{
        if(props.open===true){
            setLocalEmail(session?.user.email??'')
            setLocalName(session?.user.name??'')
            setLocalUsername(session?.user.displayUsername??'')
        }else{
            setLocalEmail('')
            setLocalName('')
            setLocalUsername('')
        }
    },[props.open])
    function handleClose(){
        refreshSession()
        props.setOpen(false)
    }
    async function handleUserUpdate(){
        const[res_u,res_e]= await  
            Promise.all([
                authClient.updateUser({
                    username:localUsername,
                    name:localName,
                }),
                authClient.changeEmail({newEmail:localEmail})
            ])
        if (res_e.error===null&&res_u.error===null){
            props.setSnackOpen(true)
            props.setSnackSev('success')
            props.setSnackMessage('Succès de changement de paramètre')
            handleClose()
        }else if(res_e.error===null){
            const message = 'Changeement utilisateur échoué: '+ ( res_u.error?.message??'')
            props.setSnackMessage(message)
            props.setSnackSev('warning')
            props.setSnackOpen(true)
            handleClose()
        }else if(res_u.error===null){
            const message = 'Changement courriel échoué: '+ ( res_e.error?.message??'')
            props.setSnackMessage(message)
            props.setSnackSev('warning')
            props.setSnackOpen(true)
            handleClose()
        }else{
            const message = 'Changemen courriel échoué: '+ ( res_e.error?.message??'') +'\n'+'Changement utilsateur échoué: '+(res_u.error?.message??'')
            props.setSnackMessage(message)
            props.setSnackSev('error')
            props.setSnackOpen(true)
            handleClose()
        }
    }
    return(
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
                <UserInfoWidget
                    values={{
                        name:localName,
                        username:localUsername,
                        email:localEmail
                    }}
                    onChange={{
                        setEmail:setLocalEmail,
                        setName:setLocalName,
                        setUserName:setLocalUsername
                    }}
                />
                
                <Button
                    onClick={handleUserUpdate}
                    variant='outlined'
                >
                    Modifier paramètres
                </Button>
            </Box>

        </Modal>
    )
}

export default UserChangeInfoModal