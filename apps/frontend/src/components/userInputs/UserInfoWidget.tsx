import { Box, TextField } from "@mui/material";

interface UIWProps{
    values:{
        name:string,
        username:string,
        email:string,
    },
    onChange:{
        setName:(newName:string)=>void;
        setUserName:(newUserName:string)=>void
        setEmail:(newEmail:string)=>void
    }
}

function UserInfoWidget(props:UIWProps){
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
                label='Nom'
                value={props.values.name}
                onChange={(e)=>props.onChange.setName(e.target.value)}
            />
            <TextField 
                label='Identifiant'
                value={props.values.username}
                onChange={(e)=>props.onChange.setUserName(e.target.value)}
            />
            <TextField 
                label='Courriel'
                value={props.values.email}
                onChange={(e)=>props.onChange.setEmail(e.target.value)}
            />
        </Box>
    )
}

export default UserInfoWidget