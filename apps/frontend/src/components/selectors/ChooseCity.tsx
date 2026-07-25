
import {useEffect, useState, type Dispatch, type SetStateAction} from 'react'
import { serviceMunicEnt } from "../../services/mun/serviceMunicEntites"
import ChooseYear from "./ChooseYear"
import type { municipalite, city_year_combo } from '@budgets_municipaux/common';
import  { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

type Props={
    value:number|null
    options:municipalite[]
    onChange:(newVal:number|null)=>void
}

function ChooseCity (
    props:Props
){
        async function handleChangeVille(target: string) {

            console.log(target)
            if (target===""){
                props.onChange(null)
            }else{
            const newVille = props.options.find((ville)=>ville.cod_geo===Number(target))
            if (newVille?.cod_geo ){
                props.onChange(newVille.cod_geo)
            }else{
                props.onChange(null)
            }
        }
    }
    return(
        <>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-outlined-label">Ville</InputLabel>
                <Select
                    labelId="demo-simple-selectcode-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.value}
                    onChange={(e: any) =>
                        handleChangeVille(e.target.value)
                    } 
                    label="Ville"
                >
                    <MenuItem value={0}>
                        <em>None</em>
                    </MenuItem>
                    {props.options.map((ville:municipalite)=>{
                        return(
                            <MenuItem value={ville.cod_geo}>
                                {ville.nom_organisme}
                            </MenuItem>
                        )
                    }
                    )}
                </Select>
            </FormControl>
        </>
    )
}

export default ChooseCity