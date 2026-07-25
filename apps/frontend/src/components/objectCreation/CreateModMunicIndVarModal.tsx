import type { EquationVar, FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSection } from "@budgets_municipaux/common";
import { Box, Button, FormControl, FormLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";


interface CMMIVMprops {
    values: {
        modalOpen: boolean,
        eqVarId:number|null,
        eqVarCreateFlag:boolean,
        partId:number|null,
        eqId:number|null
    },
    onClose: Dispatch<SetStateAction<boolean>>,
    options:{
        parts:FinStateSection[],
        rows:FinStateSecRowWHelp[],
        cols:FinStateSecColWHelp[]
    },
    onChange:{
        partChanger:(newPartId:number|null)=>void,
        eqVarChanger:(newVarId:number|null)=>void,
        createFlagChanger:(newFlag:boolean)=>void
    }
    onNew: (var_name:string,part_id:number,row_id:number,col_id:number,eq_id:number)=>Promise<boolean>,
    onUpdate: (eq_var_id:number,var_name:string,part_id:number,row_id:number,col_id:number,eq_id:number)=>Promise<boolean>
    data:EquationVar[]
}

export default function CreateModMunicIndVarModal(props: CMMIVMprops) {

    const [localVarName,setLocalVarName]=useState<string>('')
    const [localRowId,setLocalRowId]=useState<number|null>(null)
    const [localColId,setLocalColId]=useState<number|null>(null)

    useEffect(()=>{
        if (props.values.modalOpen){
            if(props.values.eqVarCreateFlag===true){// new case easy set everything to null
                setLocalVarName('')
                props.onChange.partChanger(null)
                setLocalRowId(null)
                setLocalColId(null)
            }else{
                const varToUse=props.data.find((vars)=>vars.eq_var_id===props.values.eqVarId)
                if (varToUse){
                    const newPartId=varToUse.part_id
                    props.onChange.partChanger(newPartId)
                    setLocalVarName(varToUse.eq_var_symbol)
                    setLocalRowId(varToUse.row_id)
                    setLocalColId(varToUse.col_id)
                }
            }
        }
    },[props.values.modalOpen])

    async function handleVariableCreation(){
        if (
                localVarName!==''&&
                props.values.partId!==null&&
                localRowId!==null&&
                localColId!==null&&
                props.values.eqId!==null
            ){
            const success=await props.onNew(
                localVarName,
                props.values.partId,
                localRowId,
                localColId,
                props.values.eqId
            )
            if(success){
                props.onChange.createFlagChanger(false)
                props.onChange.eqVarChanger(null)
                props.onChange.partChanger(null)
                props.onClose(false)
            }
        }
    }

    async function handleVariableUpdate(){
        if (
                localVarName!==''&&
                props.values.partId!==null&&
                localRowId!==null&&
                localColId!==null&&
                props.values.eqId!==null&&
                props.values.eqVarId!==null
            ){
            const success=await props.onUpdate(
                props.values.eqVarId,
                localVarName,
                props.values.partId,
                localRowId,
                localColId,
                props.values.eqId
            )
            if(success){
                props.onChange.createFlagChanger(false)
                props.onChange.eqVarChanger(null)
                props.onChange.partChanger(null)
                props.onClose(false)
            }
        }
    }


    function changePartId(target:string){
        if (target!==''){
            props.onChange.partChanger(Number(target))
            setLocalRowId(null)
            setLocalColId(null)
        }else{
            props.onChange.partChanger(null)
            setLocalRowId(null)
            setLocalColId(null)
        }
    }


    return(
    <Modal
        open={props.values.modalOpen}
        onClose={() => props.onClose(false)}
    >
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                outline: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <TextField 
                value={localVarName}
                onChange={(e)=>setLocalVarName(e.target.value)}
            />
            <FormControl    
                variant="outlined" 
                sx={{ m: 1, minWidth: 120 }}
            >
                <FormLabel>
                    Page États financiers
                </FormLabel>
                    
                <Select
                    value={props.values.partId??''}
                    onChange={(e)=>changePartId(String(e.target.value))}
                >
                    <MenuItem
                        value={''}
                        key={''}
                    >
                        Aucun
                    </MenuItem>
                    {props.options&&
                        props.options.parts.map((p)=>
                            <MenuItem
                                value={p.part_id.toString()}
                                key={p.part_id.toString()}
                            >
                                {p.part_desc}
                            </MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl
                variant="outlined" 
                sx={{ m: 1, minWidth: 120 }}
            >
                <FormLabel>
                    Ligne États financiers
                </FormLabel>
                <Select
                    value={String(localRowId)??''}
                    onChange={(e)=>setLocalRowId(Number(e.target.value))}
                >
                    <MenuItem
                        value={''}
                        key={''}
                    >
                        Aucun
                    </MenuItem>
                    {props.options&&
                        props.options.rows.map((r)=>
                            <MenuItem
                                value={r.row_id}
                                key={r.row_id}
                            >
                                {r.row_desc}
                            </MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl
                variant="outlined" 
                sx={{ m: 1, minWidth: 120 }}
            >
                <FormLabel>
                    Colonne États financiers
                </FormLabel>
                <Select
                    value={String(localColId)??''}
                    onChange={(e)=>setLocalColId(Number(e.target.value))}
                >
                    <MenuItem
                        value={''}
                        key={''}
                    >
                        Aucun
                    </MenuItem>
                    {props.options&&
                        props.options.cols.map((c)=>
                            <MenuItem
                                value={c.col_id}
                                key={c.col_id}
                            >
                                {c.column_desc}
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <p>
                {`Eq: ${props.values.eqId} - Var: ${props.values.eqVarId?? 'SV'} - Part: ${props.values.partId} - L: ${localRowId} - C:${localColId}`}
            </p>
            {
                props.values.eqVarCreateFlag===true&& 
                props.values.eqVarId===null&&
                props.values.partId!==null && 
                localRowId!==null&&
                localColId!==null&&
                localVarName!==''&&
                <Button
                    variant="outlined"
                    onClick={handleVariableCreation}
                >
                    Créer nouvelle variable d'équation
                </Button>
            }
            {
                props.values.eqVarCreateFlag===false&& 
                props.values.eqVarId!==null&&
                props.values.partId!==null && 
                localRowId!==null&&
                localColId!==null&&
                <Button
                    variant="outlined"
                    onClick={handleVariableUpdate}
                >
                    Modifier variable {`${props.values.eqVarId}`}
                </Button>
            }
        </Box>
    </Modal>)
}