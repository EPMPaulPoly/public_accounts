import type { EquationDef } from "@budgets_municipaux/common"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"


interface props{
    value:number|null
    options:EquationDef[]
    onChange:(equation:number|null)=>void
}

export default function ChooseIndicator(props:props){
    return(<>

        <FormControl>
        <InputLabel
            
        >
            Équation choisie
        </InputLabel>
        <Select
            value={props.value??''}
            label="Équation choisie"
            sx={{minWidth:'120px'}}
            onChange={(e)=>props.onChange(e.target.value)}
        >
            <MenuItem
                value=''
            >
                Choisis un indicateur
            </MenuItem>
            {props.options&&props.options.length>0
            &&
            props.options.map((opt)=>
                {return(
                <MenuItem
                    key={opt.eq_id}
                    value={opt.eq_id}
                >
                    {opt.eq_name}
                </MenuItem>)}
            )}
        </Select>
        </FormControl>
    </>)

}