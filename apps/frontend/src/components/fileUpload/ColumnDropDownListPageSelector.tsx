
import type { Dispatch, SetStateAction } from "react"
import { Divider, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

interface PropsPageSelect{
    colonnesFichier:string[],
    defColonnesFichier:Dispatch<SetStateAction<string[]>>
    pages:string[],
    pageAct:string,
    defPageAct:Dispatch<SetStateAction<string>>
}

function ColumnDropDownListStd(props:PropsPageSelect){


    return(<>
    {props.colonnesFichier.length>0 && <>
        <FormControl variant="outlined" size="medium" style={{ minWidth: 120 }}>
            <InputLabel id="select-objet"

            >
                Page
            </InputLabel>
            <Select
                labelId="select-objet"
                id="select-n-charts"
                value={props.pageAct}
                onChange={(e) => props.defPageAct(String(e.target.value))}
                label="Page"
            >       
                
                {props.pages.map((item)=>{
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
        <Divider variant="middle" />
    </>}
    </>)
}

export default ColumnDropDownListStd