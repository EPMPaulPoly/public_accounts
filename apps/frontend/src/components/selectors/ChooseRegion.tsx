import type { regions } from "@budgets_municipaux/common";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


interface newprops{
    value:{
        region_type:'cm'|'aucun'|'reg'|'mrc',
        region:string|null};
    options:{
        region_types:('cm'|'aucun'|'reg'|'mrc')[],
        region_options:regions[]};
    onChange: {
        reg_type_changer:(region_type:'cm'|'aucun'|'reg'|'mrc') => void,
        reg_changer:(regions:string)=>void};
}

export function ChooseRegion(props:newprops){

    return(
        <>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-outlined-label">Type de région</InputLabel>
                <Select
                    labelId="demo-simple-selectcode-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.value.region_type}
                    onChange={(e: any) =>
                        props.onChange.reg_type_changer(e.target.value)
                    } 
                    label="Type de région"
                >
                    <MenuItem value={'aucun'}>
                        Aucun - Sélectionnez une option
                    </MenuItem>
                    <MenuItem value={'mrc'}>
                        MRC
                    </MenuItem>
                    <MenuItem value={'reg'}>
                        Région administrative
                    </MenuItem>
                    <MenuItem value={'cm'}>
                        Communauté métropolitaine
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-outlined-label">Région</InputLabel>
                <Select
                    labelId="demo-simple-selectcode-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.value.region??'aucun'}
                    onChange={(e: any) =>
                        props.onChange.reg_changer(e.target.value)
                    } 
                    label="region"
                >
                    <MenuItem value={'aucun'}>
                        Aucun
                    </MenuItem>
                    {props.options.region_options.map((reg)=>{return(
                        <MenuItem value={reg.reg_code}>
                            {reg.reg_name}
                        </MenuItem>
                    )})}
                </Select>
            </FormControl>
            </>
    )
}