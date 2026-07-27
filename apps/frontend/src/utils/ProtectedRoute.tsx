import { 
    Outlet,
    Navigate     
} from "react-router"
import { authClient } from "./auth-client";
import { useAuth } from "../context/authProvider";

function AdminProtectedRoute () {
    const{session, isLoading} = useAuth()
    if (isLoading) return <div> Loading ..</div>;
    console.log('going through protected route')
    if (session?.user.role!=='admin'||!session) return <Navigate to={'/'} replace/>;
    return <Outlet/>
}

export default AdminProtectedRoute