import { Box, Button, Modal } from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import UserPasswordWidget from "../userInputs/UserPasswordWidget";
import { checkPasswordComplexity } from "../../utils/PasswordComplexityCheck";

interface CPMProps{
    values:{
        open:boolean,
        modUserId:string|null
    },
    onChange:{
        setModUserId:(userId:string|null)=>void
        setOpen:Dispatch<SetStateAction<boolean>>
        setUserPwd:(userId:string,password:string)=>Promise<boolean>
    }
}

function AdminChangePasswordModal(props:CPMProps){
    const [password,setPassword]=useState<string>('')
    const [passwordConf,setPasswordConf]=useState<string>('')
    const passwordValid=checkPasswordComplexity(password)
    const buttonEnabled=passwordValid.digit&&passwordValid.length&&passwordValid.lowercase&&passwordValid.special&&passwordValid.uppercase&&password===passwordConf

    async function handleChangePassword(){
        if (props.values.modUserId!==null){
            const success= await props.onChange.setUserPwd(props.values.modUserId,password)
            if(success===true){
                handleClose()
            }

        }
    }
    function handleClose(){
        setPassword('')
        setPasswordConf('')
        props.onChange.setOpen(false)
    }
    return (
        <Modal
            open={props.values.open}
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
                <UserPasswordWidget
                    values={{
                        password:password,
                        passwordConfirm:passwordConf
                    }}
                    onChange={{
                        setPassword:setPassword,
                        setPasswordConfirm:setPasswordConf
                    }}
                />

                    <Button
                        disabled={!buttonEnabled}
                        onClick={()=>handleChangePassword()}
                        variant="outlined"
                    >
                        Changer mot de passe
                    </Button>               

 
            </Box>
        </Modal>
    )
}

export default AdminChangePasswordModal