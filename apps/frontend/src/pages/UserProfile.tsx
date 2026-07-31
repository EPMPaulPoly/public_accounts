import { useState } from "react";
import { Footer } from "../components/common/Footer";
import MenuBar from "../components/common/MenuBar";
import UserProfilePanel from "../components/visualisation/UserProfilePanel";
import UserChangePasswordModal from "../components/objectCreation/UserChangePasswordModal";
import UserChangeInfoModal from "../components/objectCreation/UserChangeInfoModal";
import { useAppContext } from "../context/contextProvider";
import { UserSnackCommunication } from "../components/common/UserSnackCommunication";


function UserProfile(){
    const [changeInfoModalOpen,setChangeInfoModalOpen]=useState<boolean>(false)
    const [changePasswordModalOpen,setChangePasswordModalOpen]=useState<boolean>(false)
    const {snackOpen,snackMessage,snackSev,setSnackMessage,setSnackOpen,setSnackSev}=useAppContext()
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
        <UserSnackCommunication
            snackMessage={snackMessage}
            snackOpen={snackOpen}
            snackSev={snackSev}
            setSnackOpen={setSnackOpen}
        />
        
        <Footer/>
    </div>)
}

export default UserProfile