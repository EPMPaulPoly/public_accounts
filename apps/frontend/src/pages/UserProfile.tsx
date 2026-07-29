import { useState } from "react";
import { Footer } from "../components/common/Footer";
import MenuBar from "../components/common/MenuBar";
import UserProfilePanel from "../components/visualisation/UserProfilePanel";
import UserChangePasswordModal from "../components/objectCreation/UserChangePasswordModal";
import UserChangeInfoModal from "../components/objectCreation/UserChangeInfoModal";
import { Alert, Snackbar, type AlertColor, type AlertPropsColorOverrides } from "@mui/material";


function UserProfile(){
    const [changeInfoModalOpen,setChangeInfoModalOpen]=useState<boolean>(false)
    const [changePasswordModalOpen,setChangePasswordModalOpen]=useState<boolean>(false)
    const [snackOpen,setSnackOpen] = useState<boolean>(false)
    const [snackMesssage,setSnackMessage] = useState<string>('')
    const [snackSev,setSnackSev] = useState<("success" | "info" | "warning" | "error") | undefined>(undefined)
    const [failMessage,setFailMessage] = useState<string>('')
    return (
    <div
        style={{
            display:'flex',
            flexDirection:'column',
            flex:1
        }}
    >
        <MenuBar/>
        <div
            style={{
                flex:1,
                padding:'10px'
            }}
        >
            <UserProfilePanel
                onClicks={{
                    setInfoModalOpen:setChangeInfoModalOpen,
                    setPwdModalOpen:setChangePasswordModalOpen
                }}
            />
            <UserChangePasswordModal
                open={changePasswordModalOpen}
                setOpen={setChangePasswordModalOpen}
                setSnackOpen={setSnackOpen}
                setSnackMessage={setSnackMessage}
                setSnackSev={setSnackSev}
            />
            <UserChangeInfoModal
                open={changeInfoModalOpen}
                setOpen={setChangeInfoModalOpen}
                setSnackOpen={setSnackOpen}
                setSnackMessage={setSnackMessage}
                setSnackSev={setSnackSev}
            />
        </div>
        <Snackbar open={snackOpen} autoHideDuration={6000} onClose={()=>setSnackOpen(false)}>
            <Alert
                onClose={()=>setSnackOpen(false)}
                severity={snackSev}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {snackMesssage}
            </Alert>
        </Snackbar>
        
        <Footer/>
    </div>)
}

export default UserProfile