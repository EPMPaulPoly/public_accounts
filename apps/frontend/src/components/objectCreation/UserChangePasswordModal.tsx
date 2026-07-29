import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, TextField } from "@mui/material"
import { useState, type Dispatch, type SetStateAction } from "react"
import UserPasswordWidget from "../userInputs/UserPasswordWidget"
import { checkPasswordComplexity } from "../../utils/PasswordComplexityCheck"
import { useAuth } from "../../context/authProvider"
import { authClient } from "../../utils/auth-client"


interface UCPMProps{
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>
    setSnackOpen:Dispatch<SetStateAction<boolean>>
    setSnackMessage:Dispatch<SetStateAction<string>>
    setSnackSev:Dispatch<SetStateAction<("success" | "info" | "warning" | "error") | undefined>>
}

function UserChangePasswordModal(props:UCPMProps){
    const {session}=useAuth()
    const [oldPwd,setOldPwd]=useState<string>('')
    const [newPwd,setNewPwd]=useState<string>('')
    const [newPwdConf,setNewPwdConf]=useState<string>('')

    function handleClose(){
        setOldPwd('')
            setNewPwd('')
            setNewPwdConf('')
        props.setOpen(false)
    }


    const oldPwdCompCheck=checkPasswordComplexity(oldPwd)
    const isOldPwdValid= oldPwdCompCheck.digit&&oldPwdCompCheck.length&&oldPwdCompCheck.lowercase&&oldPwdCompCheck.special&&oldPwdCompCheck.uppercase
    const newPwdCompCheck=checkPasswordComplexity(oldPwd)
    const isNewPwdValid= newPwdCompCheck.digit   &&newPwdCompCheck.length&&newPwdCompCheck.lowercase&&newPwdCompCheck.special&&newPwdCompCheck.uppercase&&newPwd===newPwdConf
    async function handlePasswordChange(){
        const userId=session?.user.id
        if (userId&&isOldPwdValid&&isNewPwdValid){
            const {data,error}=await authClient.changePassword({newPassword:newPwd,currentPassword:oldPwd})
            
            if (error===null){
                props.setSnackOpen(true)
                props.setSnackSev('success')
                props.setSnackMessage('Succès de changement de mot de passe')
                handleClose()
            }else{
                props.setSnackOpen(true)
                props.setSnackSev('error')
                props.setSnackMessage('Échec de changement de mot de passe')
                handleClose()
            }
        }
    }
    return (<>
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
                <TextField type="password"
                    label='Ancien mot de passe'
                    value={oldPwd}
                    onChange={(e)=>setOldPwd(e.target.value)}
                />
                <UserPasswordWidget
                    values={{
                        password:newPwd,
                        passwordConfirm:newPwdConf
                    }}
                    onChange={{
                        setPassword:setNewPwd,
                        setPasswordConfirm:setNewPwdConf
                    }}
                />
                <Button
                    disabled={!oldPwdCompCheck&&!newPwdCompCheck}
                    onClick={handlePasswordChange}
                    variant="outlined"
                >
                    Changer mot de passe
                </Button>
            </Box>
        </Modal>
        </>
    )
}

export default UserChangePasswordModal