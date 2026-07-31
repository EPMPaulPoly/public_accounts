import { Alert, Snackbar } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

interface SnackProps {
    snackOpen: boolean,
    snackMessage: string,
    snackSev: ("success" | "info" | "warning" | "error") | undefined,
    setSnackOpen: Dispatch<SetStateAction<boolean>>
}

export function UserSnackCommunication(props: SnackProps) {
    return (
        <Snackbar 
            open={props.snackOpen} 
            anchorOrigin={{ horizontal:'center', vertical:'top' }}
            autoHideDuration={6000} 
            onClose={() => props.setSnackOpen(false)}>
            <Alert
                onClose={() => props.setSnackOpen(false)}
                severity={props.snackSev}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {props.snackMessage}
            </Alert>
        </Snackbar>
    )
}