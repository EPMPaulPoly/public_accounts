import { Box, Button, Modal } from "@mui/material"
import { useState, type Dispatch, type SetStateAction } from "react"
import UserInfoWidget from "../userInputs/UserInfoWidget"
import UserPasswordWidget from "../userInputs/UserPasswordWidget"
import UserRoleWidget from "../userInputs/UserRoleWidget"
import { type User } from "better-auth";
import { type UserWithRole } from "better-auth/plugins"
import { authClient } from "../../utils/auth-client"
import { checkPasswordComplexity } from "../../utils/PasswordComplexityCheck"
import { useAppContext } from "../../context/contextProvider"

interface NUMProps{
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>
    getUsers:()=>void
    createUser:(name:string,username:string,email:string,password:string,role:'user'|'admin')=>Promise<boolean>
}

interface NewUser{
    name:string,
    email:string,
    username:string,
    role:'admin'|'user',
    password:string,
    passwordConfirm:string
}

function NewUserModal(props:NUMProps){
    const blankUser = {
        name:'',
        email:'',
        username:'',
        role:'user' as 'user'|'admin',
        password:'',
        passwordConfirm:''
    }
    const [userNew,setUserNew]= useState<NewUser>(blankUser)
    function handleRoleChange(newRole:string){
        if (newRole==='admin'||newRole==='user'){
            setUserNew((prev)=>({...prev,role:newRole}))
        }
    }
    function handleNameChange(newName:string){
        setUserNew((prev)=>({...prev,name:newName}))
    }
    function handleUsernameChange(newUserName:string){
        setUserNew((prev)=>({...prev,username:newUserName}))
    }
    function handlePasswordChange(newPwd:string){
        setUserNew((prev)=>({...prev,password:newPwd}))
    }
    function handlePwdConf(newPwdConf:string){
        setUserNew((prev)=>({...prev,passwordConfirm:newPwdConf}))
    }
    function handleEmailChange(newEmail:string){
        setUserNew((prev)=>({...prev,email:newEmail}))
    }
    function handleClose(){
        setUserNew(blankUser)
        props.setOpen(false)
    }

    const {setSnackOpen,setSnackMessage,setSnackSev}=useAppContext()
    async function handleCreateNewUser(){
        const success = await props.createUser(userNew.name,userNew.username,userNew.email,userNew.password,userNew.role)
        if (success){
            setSnackMessage('Nouvel utilisateur créé')
            setSnackSev('success')
            setSnackOpen(true)
            handleClose()
        }else{
            setSnackMessage('Erreur lors de la création')
            setSnackSev('error')
            setSnackOpen(true)
        }
    }

    const enableButton=userNew.username&&
                    userNew.name!==''&&
                    userNew.email!==''&&
                    userNew.password!==''&&
                    userNew.passwordConfirm!==''&&
                    userNew.password===userNew.passwordConfirm&&
                    checkPasswordComplexity(userNew.password).length&&
                    checkPasswordComplexity(userNew.password).digit&&
                    checkPasswordComplexity(userNew.password).lowercase&&
                    checkPasswordComplexity(userNew.password).special&&
                    checkPasswordComplexity(userNew.password).uppercase
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
                        name:userNew.name,
                        username:userNew.username,
                        email:userNew.email
                    }}
                    onChange={{
                        setName:handleNameChange,
                        setUserName:handleUsernameChange,
                        setEmail:handleEmailChange
                    }}
                />
                <UserPasswordWidget
                    values={{
                        password:userNew.password,
                        passwordConfirm:userNew.passwordConfirm
                    }}
                    onChange={{
                        setPassword:handlePasswordChange,
                        setPasswordConfirm:handlePwdConf
                    }}
                />
                <UserRoleWidget
                    value={userNew.role}
                    onChange={handleRoleChange}
                />
                
                    <Button
                        onClick={handleCreateNewUser}
                        variant="outlined"
                        disabled={!enableButton}
                    >
                        Créer nouvel usager
                    </Button>:<></>
                
            </Box>
        </Modal>
    )
}

export default NewUserModal