import { 
    Box, 
    Button, 
    Modal 
} from "@mui/material";
import type { UserWithRole } from "better-auth/plugins";
import type { Dispatch, SetStateAction } from "react";
import { useAuth } from "../../context/authProvider";


interface UMMProps{
    values:{
        open: boolean,
        currentUser:UserWithRole|null
    },
    onClicks:{
        setCurrentUser:Dispatch<SetStateAction<string|null>>
        setOpen: Dispatch<SetStateAction<boolean>>
        setChangeRoleOpen:Dispatch<SetStateAction<boolean>>
        setBanUserOpen:Dispatch<SetStateAction<boolean>>
        unBanUser:(userId:string)=>Promise<boolean>
        impersonateUser:(userId:string)=>Promise<void>
        setChangePasswordOpen:Dispatch<SetStateAction<boolean>>
    }
}

function UserOpsModal(props:UMMProps){
    function handleClose(){
        props.onClicks.setCurrentUser(null);
        props.onClicks.setOpen(false)
    }
    async function handleUnban(){
        if (props.values.currentUser){
            const success = await props.onClicks.unBanUser(props.values.currentUser?.id)
            if (success){
                handleClose()
            }else{
                alert('Échec de rétablissement')
            }
        }
    }
    function handleImpersonate(){
        if(props.values.currentUser!==null){
            props.onClicks.impersonateUser(props.values.currentUser.id)
        }
    }
    return(
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
                    
                    <Button
                        variant='outlined'
                        onClick={()=>props.onClicks.setChangeRoleOpen(true)}
                    >
                        Changer rôle usager
                    </Button>
                    {props.values.currentUser?.banned===false?
                    <Button
                        variant='outlined'
                        onClick={()=>{props.onClicks.setBanUserOpen(true)}}
                    >
                        Banir usager
                    </Button>:
                    <Button
                        variant="outlined"
                        onClick={handleUnban}
                    >
                        Rétablir usager
                    </Button>}
                    <Button
                        variant='outlined'
                        onClick={()=>props.onClicks.setChangePasswordOpen(true)}
                    >
                        Changer mot de passe
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={handleImpersonate}
                    >
                        Imiter usager
                    </Button>
            </Box>
        </Modal>
    )
}

export default UserOpsModal