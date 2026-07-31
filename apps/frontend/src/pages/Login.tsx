import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import MenuBar from "../components/common/MenuBar";
import { useState, } from "react";
import { useAuth } from "../context/authProvider";
import { useNavigate } from "react-router-dom";
import { getPasswordRequirements } from "../utils/PasswordComplexityCheck";
import { UserSnackCommunication } from "../components/common/UserSnackCommunication";
import { useAppContext } from "../context/contextProvider";

export default function LoginPage(){
    const{login}=useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setSnackMessage,setSnackOpen,setSnackSev,snackMessage,snackOpen,snackSev}=useAppContext()
    async function onSubmit(){
        const result = await login(username, password)
        
        if (result.error===null) {
            setSnackMessage('Login successful')
            setSnackSev('success')
            setSnackOpen(true)
            // ✅ Manually navigate - callbackURL won't trigger this
            setTimeout(() => {
            navigate("/");
            }, 500);
        }else{
            setSnackMessage(`Error : ${result.error.message}`)
            setSnackSev('error')
            setSnackOpen(true)
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
            <TextField 
                type='password' 
                label='Password' 
                key='password' 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                    e.preventDefault(); // optional
                    onSubmit();
                    }
                }}
            />
            <span
                style={{whiteSpace:'pre-line'}}
            >
            {passwordIssues.map((i)=>i+'\n')}    
            </span>
            <Button
                variant="outlined"
                onClick={onSubmit}
                disabled={passwordIssues.length!==0}
                color={passwordIssues.length!==0?'error':'success'}
            >
                Login
            </Button>
            </Box>
            <UserSnackCommunication
                snackMessage={snackMessage}
                snackSev={snackSev}
                snackOpen={snackOpen}
                setSnackOpen={setSnackOpen}
            />
        </div>
    </>)
}