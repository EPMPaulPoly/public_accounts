import type { AnalysisType } from "@budgets_municipaux/common"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

interface CATTypes{
    value:string|null,
    onChange:(newAnaly:'trans'|'long')=>void
    options:AnalysisType<'trans'|'long'>[]
}

export default function ChooseAnalysisType(props:CATTypes){
    function handleChange(newVal:string|null
    ){ 
        if (newVal==='long'||newVal==='trans'
        ){
            props.onChange(newVal)
        }
    }
    return(<>
        <FormControl>
            <InputLabel>
                Type d'analyse
            </InputLabel>  
            <Select
                label="Type d'analyse"
                value={props.value}
                onChange={(e)=>handleChange(e.target.value)}
            >
                {props.options.map((o)=>
                    <MenuItem
                        value={o.code}
                    >
                        {o.display}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    </>)
}