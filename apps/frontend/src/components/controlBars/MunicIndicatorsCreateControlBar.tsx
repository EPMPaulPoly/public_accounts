import type { EquationDef } from "@budgets_municipaux/common"
import ChooseIndicator from "../selectors/ChooseIndicator"
import { Box, Button } from "@mui/material"
import type { Dispatch, SetStateAction } from "react"
import { authClient } from "../../utils/auth-client"

interface props{
    value:number|null,
    onChange:(eqId:number|null)=>void,
    onModalOpen:Dispatch<SetStateAction<boolean>>
    onChangeEditFlage:(newFlag:boolean)=>void
    options:EquationDef[]
}

export default function MunicIndicatorCreateControlBar(props:props){

    const { data: session, isPending } = authClient.useSession();
              
    const isUser = session?.user.role === 'user'||session?.user.role==='admin';
    return(
        <Box sx={{
                    display: 'flex',
                    alignItems: 'center', // Vertical alignment
                    gap: 2,               // Spacing between components

                    justifyContent: 'center', // Horizontal center
                }}>
            <ChooseIndicator
                value={props.value}
                onChange={props.onChange}
                options={props.options??[]}
            />
            {isUser ? <>
                <Button
                    variant="outlined"
                    onClick={() => { props.onModalOpen(true); props.onChangeEditFlage(true) }}
                >
                    Créer nouvel indicateur
                </Button>
                <Button
                    variant='outlined'
                >
                    Supprimer indicateur
                </Button>
            </> : <></>}
            
        </Box>
    )
}