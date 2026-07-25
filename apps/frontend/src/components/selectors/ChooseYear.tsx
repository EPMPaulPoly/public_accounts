import type { FinStateAssignGrid, FinStateSection, regions, year } from "@budgets_municipaux/common"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { type Dispatch, type SetStateAction } from "react"
import { serviceMunicEnt } from "../../services/mun/serviceMunicEntites"
import { serviceReportAssign } from "../../services/mun/serviceReportAssign"


interface newProps {
    value: number | null
    options: year[]
    onChange: ((newYear: number) => void)
}
function ChooseYear(
    props: newProps
) {
    return (
        <>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-outlined-label">Année</InputLabel>
                <Select
                    labelId="demo-simple-selectcode-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.value === null ? 0 : props.value}
                    onChange={(e: any) =>
                        props.onChange(Number(e.target.value))
                    }
                    label="Année"
                >
                    {props.options && props.options.length == 0 ?
                        <MenuItem value={0}>
                            Sélectionnez une année
                        </MenuItem> :
                        props.options.map((a) => (
                            <MenuItem key={a.year} value={a.year}>
                                {a.year}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </>
    )
}

export default ChooseYear