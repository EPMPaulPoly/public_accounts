import {  type Dispatch, type SetStateAction } from "react"
import { Divider, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import type { FileDBEquivalence } from "@budgets_municipaux/common"

interface PropsStdColumnsDropDown{
    colonnesFichier:string[],
    defColonnesFichier:Dispatch<SetStateAction<string[]>>
    champsARemplir: FileDBEquivalence[]
    defChampsARemplir:Dispatch<SetStateAction<FileDBEquivalence[]>>,
    pageAct:string
}

function ColumnDropDownListStd(props:PropsStdColumnsDropDown){

    const handleMapping = (field:string,value:string)=>{
        const newEqui = props.champsARemplir.map((ligne)=>{
            if(ligne.db_column!==field){
                return ligne
            }else{
                return{...ligne,file_column:value}
            }})
        props.defChampsARemplir(newEqui)
    }
    return(<>
    {props.colonnesFichier.length > 0 && <>
    <span>Propriétés {props.pageAct}</span>
        {
            props.champsARemplir.map((champs) => {
                if((champs.page!== undefined  && champs.page ===props.pageAct)||(champs.page===undefined && props.pageAct==='Autres') ){
                    return(<>
                    <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
                        <InputLabel id="select-objet"

                        >
                            {champs.column_description}
                        </InputLabel>
                        <Select
                            labelId="select-objet"
                            id="select-n-charts"
                            value={champs.file_column}
                            onChange={(e) => handleMapping(champs.db_column,e.target.value)}
                            label={champs.column_description}
                        >   
                            <MenuItem 
                                value={''}
                            >
                                Changez cette valeur
                            </MenuItem>
                            {props.colonnesFichier.map((item)=>{
                                return(
                                    <MenuItem 
                                        value={item}
                                    >
                                        {item}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    </>)
                } else{
                    return (<></>)
                }
            
            })
        }
            <Divider variant="middle"  />
    </>}
    </>)
}

export default ColumnDropDownListStd