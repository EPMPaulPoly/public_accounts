import type { EquationDef } from "@budgets_municipaux/common";
import { Box, Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import { authClient } from "../../utils/auth-client";

interface eqDispProps{
    values:number|null,
    options:EquationDef[]   
    actions:{
        setWindowOpen:Dispatch<SetStateAction<boolean>>,
        setCreateFlag:(newFlag:boolean)=>void
    }
}

export function IndicatorEquationDisplay(props: eqDispProps) {
    const eqToDisp = props.options.find((e) => e.eq_id === props.values) ?? { eq_name: '', eq_expression: '', eq_id: -1 }
    const { data: session, isPending } = authClient.useSession();
                  
    const isUser = session?.user.role === 'user'||session?.user.role==='admin';
    return (<>
        {props.values && eqToDisp&&props.options&& (
            <Box
                sx={{gap:'5px'}}
            >
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                {eqToDisp.eq_name}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                {eqToDisp.eq_expression}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                {isUser?
                    <>
                        <Button
                    onClick={() => {props.actions.setWindowOpen(true); props.actions.setCreateFlag(false)}}
                    variant="outlined"
                >
                    Éditer la définition
                </Button>
                    </>:<>
                    </>
                }
                </Box>)}
    </>)
}