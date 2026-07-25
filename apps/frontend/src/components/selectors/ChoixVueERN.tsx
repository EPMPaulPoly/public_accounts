import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material"
import { useState, type SetStateAction , type Dispatch} from "react"

type Props = {
    vue: 'tab'|'sankey'|'bar';
    defVue: Dispatch<SetStateAction<'tab'|'sankey'|'bar'>>;
};


export default function ChoixVueERN({
    vue,
    defVue
}: Props)  {
   
    function handleChangeVue(target:string){
        if (target==='tab' || target==='sankey'||target==='bar'){
            defVue(target)
        }
    }
    
    return (
        <>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-outlined-label">Vue</InputLabel>
                <Select
                    labelId="demo-simple-selectcode-outlined-label"
                    id="demo-simple-select-outlined"
                    value={vue}
                    onChange={(e: any) =>
                        handleChangeVue(e.target.value)
                    } 
                    label="Ville"
                >
                    <MenuItem value="tab">
                        <em>Table</em>
                    </MenuItem>
                    <MenuItem value="sankey">
                        <em>Sankey</em>
                    </MenuItem>
                    <MenuItem value='bar'>
                        <em>Bar</em>
                    </MenuItem>
                </Select>
            </FormControl>
        </>
    )
}