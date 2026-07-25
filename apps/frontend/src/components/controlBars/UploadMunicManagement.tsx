import Button from "@mui/material/Button"
import { useState, type Dispatch, type SetStateAction } from "react"
interface props{
    dateModalOpen:boolean,
    setDateModalOpen:Dispatch<SetStateAction<boolean>>
    uploadMunicModalOpen:boolean,
    setUploadMunicModalOpen:Dispatch<SetStateAction<boolean>>
}
import { authClient } from "../../utils/auth-client"


function UploadMunicipalititesManagement(
    {
        dateModalOpen,
        setDateModalOpen,
        uploadMunicModalOpen,
        setUploadMunicModalOpen
    }:props
){
    const { data: session, isPending } = authClient.useSession();
  
    const isAdmin = session?.user.role === 'admin';
    return(
        <>  

            {isAdmin?<><Button
                onClick={() => setDateModalOpen(true)}
                variant="outlined"
                sx={{gap:'10px'}}
            >
                Gérer Années
            </Button>
            <Button
                variant="outlined"
                onClick={()=>setUploadMunicModalOpen(true)}
            >
                Verser municipalités
            </Button></>:<></>}
            
        </>
    )
}

export default UploadMunicipalititesManagement