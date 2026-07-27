import type { UserWithRole } from "better-auth/plugins"
import { useEffect, useState } from "react"
import { authClient } from "../../utils/auth-client"
import { useNavigate, useNavigation } from "react-router-dom"
import { useAuth } from "../../context/authProvider"


const useAdmin =()=>{

    const{refreshSession} = useAuth()
    const navigate = useNavigate()
    const [users,setUsers] = useState<UserWithRole[]>([])

    const [modUserId,setModUserId] = useState<string|null>(null)
    const [currentUserEdit,setCurrentUserEdit] = useState<UserWithRole|null>(null)
    const [totalCount,setTotalCount] = useState<number>(0)
    const [page,setPage] = useState<number>(0)
    const [rowsPerPage,setRowsPerPage] = useState<number>(10)

    useEffect(()=>{
        getUsers()

    },[page,rowsPerPage])

    useEffect(()=>{
        getCurrentUser()
    },[modUserId])

    async function getUsers(queryIn?:{
        query:{
            searchValue?:string,
            searchField?:"name"|"email",
            sortBy?:string,
            sortDirection?:'asc'|'desc',
            filterField?:string,
            filterValue?:string
            filter?:"in" | "contains" | "starts_with" | "ends_with" | "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "not_in"
        }
    }){
        if (queryIn) {
            const { data, error } = (await authClient.admin.listUsers({
                query: {
                    ...queryIn.query,
                    limit: rowsPerPage,
                    offset: page * rowsPerPage
                }
            }))
            if (data){
                setUsers(data.users)
                setTotalCount(data.total)
            }
            if(error!==null){
                alert(error.message)
            }
        }else{
            const { data, error } = (await authClient.admin.listUsers({
                query: {
                    limit: rowsPerPage,
                    offset: page * rowsPerPage
                }
            }))
            if (data){
                setUsers(data.users)
                setTotalCount(data.total)
            }
            if(error!==null){

            }
        }
    } 
    async function getCurrentUser(){
        if (modUserId!==null){
            const {data,error} = await authClient.admin.getUser({query:{id:modUserId}})
            setCurrentUserEdit(data)
        }else{
            setCurrentUserEdit(null)
        }
    }

    async function createUser(name:string,username:string,email:string,password:string,role:'user'|'admin'){
        const {data,error}= await authClient.admin.createUser({name:name,email:email,role:role,password:password,data:{username:username}})
        if (error===null){
            getUsers()
            return true
        }
        return false
    }

    async function updateRole(role:string){
        if(modUserId!==null &&(role==='user'||role==='admin')){
            const {data,error} = await authClient.admin.setRole({userId: modUserId,role:role})
            if (error===null){
                getUsers()
                return true
            }   
        }
        return false
    }

    async function banUser(userId:string,reason:string,time:number){
        const {data,error} = await authClient.admin.banUser({userId:userId,banReason:reason,banExpiresIn:time})
        if (error===null){
            getUsers()
            getCurrentUser()
            return true
        }
        return false
    }

    async function unBanUser(userId:string){
        const {data,error} = await authClient.admin.unbanUser({userId})
        if (error===null){
            getUsers()
            getCurrentUser()
            return true
        }
        return false
    }

    async function deleteUser(userId:string){
        const {data,error}= await authClient.admin.removeUser({userId})
        if(error===null){
            setModUserId(null)
            getUsers()
            return true
        }
        return false
    }
    async function impersonateUser(userId:string){
        const {data,error} = await authClient.admin.impersonateUser({userId})
        if(error===null){
            await refreshSession()
            navigate('/')
        }else{
            alert('erreur en essayant d imiter usager')
        }
    }
    async function changePassword(userId:string,password:string){
        const {data,error}=await authClient.admin.setUserPassword({newPassword:password,userId:userId})
        if (error===null){
            return true
        }else{
            alert('Erreur en changeant le mot de passe')
        }
        return false
    }
    return{
        users,
        page,
        rowsPerPage,
        totalCount,
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
    }
}
export default useAdmin