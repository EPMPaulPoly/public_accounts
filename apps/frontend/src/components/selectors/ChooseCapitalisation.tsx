
import { Checkbox, FormControl, FormControlLabel, InputLabel } from "@mui/material"

interface CCapProps {
    value: boolean,
    onChange: (newCapitalize: boolean) => void
}

export default function ChooseCapitalisation(props: CCapProps) {
    return (<>
        <FormControl>
            <FormControlLabel
                label="Normaliser par population"
                control={
                    <Checkbox
                        checked={props.value}
                        onChange={(e) => props.onChange(e.target.checked)}
                    />
                }>
            </FormControlLabel>
        </FormControl>
    </>)
}