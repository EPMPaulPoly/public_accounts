import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useAuth } from "../../context/authProvider"
import { Edit } from "@mui/icons-material"
import type { Dispatch, SetStateAction } from "react"

interface UPPProps{
    onClicks:{
        setInfoModalOpen:Dispatch<SetStateAction<boolean>>
        setPwdModalOpen:Dispatch<SetStateAction<boolean>>
    }
}
function UserProfilePanel(
    props:UPPProps
){
    const {session}=useAuth( )
    return (<>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Champs
                    </TableCell>
                    <TableCell>
                        Valeur
                    </TableCell>
                    <TableCell>

                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    
                <TableCell>
                    Identification
                </TableCell>
                <TableCell>

                </TableCell>
                <TableCell>
                    <IconButton
                        onClick={()=>props.onClicks.setInfoModalOpen(true)}
                    >
                        <Edit/>
                    </IconButton>
                </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Nom 
                    </TableCell>
                    <TableCell>
                        {session?.user.name}
                    </TableCell>
                    <TableCell>

                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Courriel 
                    </TableCell>
                    <TableCell>
                        {session?.user.email}
                    </TableCell>
                    <TableCell>
                        
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Nom d'usage 
                    </TableCell>
                    <TableCell>
                        {session?.user.displayUsername}
                    </TableCell>
                    <TableCell>
                        
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Membre depuis
                    </TableCell>
                    <TableCell>
                        {session?.user.createdAt.toLocaleDateString()+' - '+session?.user.createdAt.toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                        
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Mot de passe
                    </TableCell>
                    <TableCell>
                        *********** 
                    </TableCell>
                    <TableCell>
                        <IconButton
                            onClick={()=>props.onClicks.setPwdModalOpen(true)}
                        >
                        <Edit/>
                    </IconButton>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </>)
}

export default UserProfilePanel