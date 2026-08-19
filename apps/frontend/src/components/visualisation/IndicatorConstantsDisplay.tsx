import type { IndicatorConstant, IndicatorWUse } from "@budgets_municipaux/common";
import { 
    Button,
    IconButton,
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow 
} from "@mui/material";
import { useAuth } from "../../context/authProvider";
import type { Dispatch, SetStateAction } from "react";
import { Delete } from "@mui/icons-material";
import { serviceIndicatorEquation } from "../../services/mun/serviceMunicIndicators";
import { verifyAccessToken } from "better-auth";

interface ICDProps{
    eq_id:number|null
    data:IndicatorConstant[]|IndicatorWUse[]
    onAction:{
        setConstantAddModalOpen:Dispatch<SetStateAction<boolean>>
        forceUpdate:()=>Promise<void>
    }
}

export function IndicatorConstantsDisplay(props:ICDProps){

    const {session}= useAuth()

    async function handleDelete(use_id:number|null|undefined){
        if (use_id!==null&&use_id!==undefined){
            const result =  await serviceIndicatorEquation.deleteConstantUse(use_id)
            if (result.success){
                props.onAction.forceUpdate()
            }
        }
    }
    return(<>
        {props.eq_id&&(
        <>
            <Table
                size='small'
                stickyHeader
                sx={{paddingLeft:'10px',paddingRight:'10px',paddingBottom:'10px'}}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Description
                        </TableCell>
                        <TableCell>
                            Symbole 
                        </TableCell>
                        <TableCell
                            align='right'
                        >
                            Valeur par défaut
                        </TableCell>
                        <TableCell
                            width='20px'
                        >
                            
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((cst)=>
                    <TableRow
                        key={cst.const_id}
                    >
                        <TableCell>
                            {cst.constant_desc}
                        </TableCell>
                        <TableCell>
                            {cst.symbol}
                        </TableCell>
                        <TableCell
                            align='right'
                        >
                            {cst.default_value}
                        </TableCell>
                        <TableCell>
                            {Object.keys(cst).includes('use_id')?
                            <IconButton
                                aria-label={`Remove constant ${cst.constant_desc} from equation`}
                                onClick={() =>
                                        'use_id' in cst 
                                            ? handleDelete(cst.use_id)
                                            : console.log('NO use id in object')
                                    }
                            >
                                <Delete/>
                            </IconButton>:<></>}
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
            {session?.user.role==='admin'||session?.user.role==='user'?
                <Button
                    variant='outlined'
                    onClick={()=>props.onAction.setConstantAddModalOpen(true)}
                >
                    Ajouter une constante 
                </Button>:<></>}
        </>)}</>
    )
}