import type { IndicatorConstant } from "@budgets_municipaux/common";
import { 
    IconButton,
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow 
} from "@mui/material";
import { useAuth } from "../../context/authProvider";
import  Edit  from "@mui/icons-material/Edit";
import type { Dispatch, SetStateAction } from "react";


interface CVProps{
    data:IndicatorConstant|null
    onAction:{
        setEditModalOpen:Dispatch<SetStateAction<boolean>>
    }
}

const labels: Record<string, string> = {
    const_id: "Identifiant",
    constant_desc: "Description",
    default_value: "Valeur par défaut",
    index_year: "Année de référence",
    symbol:"Symbole"
};

export function ConstantVisualisation(props:CVProps){
    const {session}=useAuth()
    function viewHeaderTable(){
        return(<>
             <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Élément</TableCell>
                    <TableCell>Valeur
                        {props.data&&(
                            session?.user.role==='admin'||
                            session?.user.role==='user')?
                                <IconButton 
                                    aria-label='Edition constante'
                                    onClick={()=>props.onAction.setEditModalOpen(true)}
                                >
                                    <Edit/>
                                </IconButton>:
                                <>
                                </>
                        }
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {props.data &&
                    Object.entries(props.data).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell>{labels[key]??key}</TableCell>
                            <TableCell>{String(value)}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
        </>)
    }
    return(
        <div
                style={{
                    flex:1,
                    padding:'10px'
                }}
            >
            {viewHeaderTable()}
        </div>
    )
}