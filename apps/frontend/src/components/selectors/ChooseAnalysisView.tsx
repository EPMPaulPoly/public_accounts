import type { AnalysisType } from "@budgets_municipaux/common"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

interface CATTypes{
    value:string|null,
    onChange:(newAnaly:'chart'|'table')=>void
    options:AnalysisType<'chart'|'table'>[]
}

export default function ChooseAnalysisView(props:CATTypes){
    function handleChange(newVal:string|null
    ){ 
        if (newVal==='table'||newVal==='chart'
        ){
            props.onChange(newVal)
        }
    }
    return(<>
        <FormControl>
            <InputLabel>
                Visualisation d'analyse
            </InputLabel>  
            <Select
                label="Visualisation d'analyse"
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