import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface URWProps{
    value:'admin'|'user'
    onChange:(newRole:string)=>void
}

function UserRoleWidget(props:URWProps){
    return(
        <Box
            sx={{                
                display:'flex',
                flexDirection:'column',
                gap:2,
                width:300
            }}
        >
            <FormControl>
                <InputLabel label-id='role-id'>
                    Type usager
                </InputLabel>
                <Select
                    value={props.value}
                    onChange={(e)=>props.onChange(e.target.value)}
                    labelId="role-id"
                    label='Type usager'
                >
                    <MenuItem
                        key='admin'
                        value='admin'
                    >
                        Admin - Éditer données
                    </MenuItem>
                    <MenuItem
                        key='user'
                        value='user'
                    >
                        Usager - Éditer Indicateurs
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default UserRoleWidget