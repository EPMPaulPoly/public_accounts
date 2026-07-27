import { Box, TextField } from "@mui/material"
import { getPasswordRequirements } from "../../utils/PasswordComplexityCheck";

interface UPWProps{
    values:{
        password:string,
        passwordConfirm:string
    },
    onChange:{
        setPassword:(newPassword:string)=>void;
        setPasswordConfirm:(newPasswordConf:string)=>void
    }
}


function UserPasswordWidget(props:UPWProps){
    const passwordIssues=getPasswordRequirements(props.values.password)
    return(
        <Box
            sx={{
                display:'flex',
                flexDirection:'column',
                gap:2,
                width:300
            }}
        >
            <TextField 
                label='Mot de passe'
                type='password'
                value={props.values.password}
                onChange={(e)=>props.onChange.setPassword(e.target.value)}
            />
            <TextField 
                label='Confirme mot de passe'
                type='password'
                value={props.values.passwordConfirm}
                onChange={(e)=>props.onChange.setPasswordConfirm(e.target.value)}
            />
            <span
                style={{whiteSpace:"pre-line"}}
            >
            {passwordIssues.map((i)=>i+'\n')}
            </span>
        </Box>
    )
}

export default UserPasswordWidget