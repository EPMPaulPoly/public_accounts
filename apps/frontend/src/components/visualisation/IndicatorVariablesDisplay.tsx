import type { EquationVar, EqVarWDesc, FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSection } from "@budgets_municipaux/common";
import { Edit } from "@mui/icons-material";
import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import { authClient } from "../../utils/auth-client";


interface IVDprops {
    selection: {
        part_id: number | null,
        eq_id: number | null
    },
    options: {
        parts: FinStateSection[],
        rows: FinStateSecRowWHelp[],
        cols: FinStateSecColWHelp[]
    },
    onEdit:{
        setVarCreateEditFlag:(varCreate:boolean)=>void
        setModifiedVar:(var_sel:number|null)=>void,
        setModalOpen:Dispatch<SetStateAction<boolean>>
    },
    data: EqVarWDesc[]
}

export default function IndicatorVariablesDisplay(props: IVDprops) {
    function handleNewVar() {
        props.onEdit.setVarCreateEditFlag(true)
        props.onEdit.setModifiedVar(null)
        props.onEdit.setModalOpen(true)
    }

    function handleUpdateVar(var_id: number) {
        props.onEdit.setVarCreateEditFlag(false)
        props.onEdit.setModifiedVar(var_id)
        props.onEdit.setModalOpen(true)
    }
    const { data: session, isPending } = authClient.useSession();
                      
    const isUser = session?.user.role === 'user'||session?.user.role==='admin';
    return (<>
        {
            props.selection.eq_id && (
                <>
                    <Table
                        stickyHeader
                        size='small'
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Symbole Variable
                                </TableCell>
                                <TableCell>
                                    Partie États financiers
                                </TableCell>
                                <TableCell>
                                    Ligne États financiers
                                </TableCell>
                                <TableCell>
                                    Colonne États financiers
                                </TableCell>
                                <TableCell>

                                </TableCell>
                                {isUser?<>
                                    <TableCell>

                                    </TableCell>
                                </>:<></>}
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.data && props.data.map((varEq) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            {varEq.eq_var_symbol}
                                        </TableCell>
                                        <TableCell>
                                            {varEq.part_desc}
                                        </TableCell>
                                        <TableCell>
                                            {varEq.row_desc}
                                        </TableCell>
                                        <TableCell>
                                            {varEq.column_desc}
                                        </TableCell>
                                        {
                                            isUser?<>
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() => handleUpdateVar(varEq.eq_var_id)}
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </TableCell>
                                            </>:<>
                                            
                                            </>
                                        }
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    {isUser?<>
                        <Button
                            variant="outlined"
                            onClick={handleNewVar}
                        >
                            Ajouter variable
                        </Button>
                    </>:<>
                    
                    </>}
                    
                </>
            )
        }

    </>)
}