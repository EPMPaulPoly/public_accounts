import { userSchema } from "better-auth";
import MenuBar from "../components/common/MenuBar";
import { authClient } from "../utils/auth-client";
import { useEffect, useState } from "react";
import type { UserWithRole } from "better-auth/plugins";
import { Footer } from "../components/common/Footer";
import UserTable from "../components/admin/UserTable";
import AdminPageControlBar from "../components/admin/AdminPageControlBar";
import UserOpsModal from "../components/admin/UserOpsModal";
import useAdmin from "../components/admin/useAdmin";
import NewUserModal from "../components/admin/NewUserModal";
import ModUserRoleModal from "../components/admin/ModUserRoleModal";
import BanUserModal from "../components/admin/BanUserModal";
import AdminChangePasswordModal from "../components/admin/AdminChangePasswordModal";
import { setPassword } from "better-auth/api";
import { UserSnackCommunication } from "../components/common/UserSnackCommunication";
import { useAppContext } from "../context/contextProvider";





function AdminPage(){

    const {
        users,
        totalCount,
        page,
        rowsPerPage,
        modUserId,
        currentUserEdit,
        setPage,
        setRowsPerPage,
        getUsers,
        createUser,
        setModUserId,
        updateRole,
        banUser,
        unBanUser,
        deleteUser,
        impersonateUser,
        changePassword
    }=useAdmin()
    const [newUserModalOpen,setNewUserModal] = useState<boolean>(false)
    const [modModalOpen,setModModalOpen] = useState<boolean>(false)
    const [modUserRoleOpen,setModUserRoleOpen] = useState<boolean>(false);
    const [banUserModalOpen,setBanUserModalOpen] = useState<boolean>(false)
    const [changePasswordModalOpen,setChangePasswordModalOpen]=useState<boolean>(false)
    const {setSnackOpen,setSnackMessage,setSnackSev,snackMessage,snackOpen,snackSev}=useAppContext()
    return(<>
        <MenuBar
            setSnackOpen={setSnackOpen}
            setSnackMessage={setSnackMessage}
            setSnackSev={setSnackSev}
        />
        <div>
            <AdminPageControlBar
                onClick={{
                    onClickNewUser:()=>setNewUserModal(true)
                }}
            />
        </div>
        <div
            style={{
                flex:1,
                padding:'10px'
            }}
        >
            <UserTable
                values={{
                    page:page,
                    total:totalCount,
                    rowsPerPage:rowsPerPage,
                    users:users,
                    currentUserId:modUserId
                }}
                onChange={{
                    setRowsPerPage:setRowsPerPage,
                    setPage:setPage,
                }}
                onClick={{
                    setEditModalOpen:setModModalOpen,
                    setUserEdit:setModUserId,
                    deleteUser:deleteUser
                }}
            />
            <UserOpsModal
                values={{
                    open:modModalOpen,
                    currentUser:currentUserEdit
                }}
                onClicks={{
                    setOpen:setModModalOpen,
                    setChangeRoleOpen:setModUserRoleOpen,
                    setBanUserOpen:setBanUserModalOpen,
                    setCurrentUser:setModUserId,
                    unBanUser:unBanUser,
                    impersonateUser:impersonateUser,
                    setChangePasswordOpen:setChangePasswordModalOpen
                }}
            />
            <NewUserModal
                open={newUserModalOpen}
                setOpen={setNewUserModal}
                getUsers={getUsers}
                createUser={createUser}
            />
            <ModUserRoleModal
                open={modUserRoleOpen}
                setOpen={setModUserRoleOpen}
                currentUser={currentUserEdit}
                onSave={updateRole}
            />
            <BanUserModal
                open={banUserModalOpen}
                setOpen={setBanUserModalOpen}
                currentId={modUserId}
                setCurrentId={setModUserId}
                onBan={banUser}
            />
            <AdminChangePasswordModal
                values={{
                    open:changePasswordModalOpen,
                    modUserId:modUserId,
                }}
                onChange={{
                    setOpen:setChangePasswordModalOpen,
                    setModUserId:setModUserId,
                    setUserPwd:changePassword
                }}
            />
        
        </div>
        <UserSnackCommunication
            snackMessage={snackMessage}
            snackOpen={snackOpen}
            snackSev={snackSev}
            setSnackOpen={setSnackOpen}
        />
        <Footer/>
    </>)
}

export default AdminPage