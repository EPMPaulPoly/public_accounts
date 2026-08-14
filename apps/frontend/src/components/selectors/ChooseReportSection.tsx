import type { 
    FinStateSection
} from "@budgets_municipaux/common"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

interface props {
    value:number|null,
    options:FinStateSection[]
    onChange: ((newPartId: number) => void)
}

export default function ChooseReportSection(props:props){

    return(
        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-outlined-label">Sections États Financiers</InputLabel>
                <Select
                    labelId="demo-simple-selectcode-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.value?? 'aucun'}
                    onChange={(e: any) =>
                        props.onChange(e.target.value)
                    }
                    label="Sections États Finaciers"
                >
                    <MenuItem value={'aucun'}>
                        Aucun
                    </MenuItem>
                    {props.options.map((reg) => {
                        return (
                            <MenuItem value={reg.part_id}>
                                {reg.part_page_def + ' - ' + reg.part_desc}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
    )
}