import { Box, Button, TextField } from "@mui/material";
import MenuBar from "../components/common/MenuBar";
import { useState, } from "react";
import { useAuth } from "../context/authProvider";
import { useNavigate } from "react-router-dom";
import { getPasswordRequirements } from "../utils/PasswordComplexityCheck";

export default function LoginPage(){
    const{login}=useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function onSubmit(){
        const result = await login(username, password)
    
        if (!result.error) {
            // ✅ Manually navigate - callbackURL won't trigger this
            navigate('/')
        }
    }
    const passwordIssues=getPasswordRequirements(password)
    return(<>
        <MenuBar/>
        <div
            style={{
                display: 'flex',           // ← THE MISSING PIECE
                justifyContent: 'center',  // horizontal center
                alignItems: 'center',      // vertical center
                minHeight: '100vh',        // ← gives it height to center within
            }}
        >
            <Box
                component="section" 
                sx={{ 
                    p: 2, 
                    alignContent:'center',
                    display:'flex',
                    flexDirection:'column',
                    width:'600px' ,
                    gap:'10px'
                }}
            >

            
            <TextField type='text' label='Username' key='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <TextField type='password' label='Password' key='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <span
                style={{whiteSpace:'pre-line'}}
            >
            {passwordIssues.map((i)=>i+'\n')}    
            </span>
            <Button
                variant="outlined"
                onClick={onSubmit}
                disabled={passwordIssues.length!==0}
            >
                Login
            </Button>
            </Box>
        </div>
    </>)
}