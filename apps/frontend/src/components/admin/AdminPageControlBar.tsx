import { Box, Button } from "@mui/material";


interface APCBProps{
    onClick:{
        onClickNewUser:()=>void
    }
}

function AdminPageControlBar(props:APCBProps){
    return(
        <Box
            sx={{
                    display: 'flex',
                    alignItems: 'center', // Vertical alignment
                    gap: 2,               // Spacing between components
                    justifyContent: 'center', // Horizontal center
                    padding:'10px'
                }}
        >
            <Button
                variant="outlined"
                onClick={props.onClick.onClickNewUser}
            >
                Crée usager
            </Button>
        </Box>
    )
}

export default AdminPageControlBar