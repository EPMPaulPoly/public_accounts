import type { FinStateSecColWHelp, FinStateSecRowWHelp, FinStateSection, year,FinStateAssignGrid } from "@budgets_municipaux/common";
import { Box, Button } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import ChooseYear from "../selectors/ChooseYear";
import ChooseReportSection from "../selectors/ChooseReportSection";
import { authClient } from "../../utils/auth-client";


interface props{
    selection:{
        year:number|null,
        part_id:number|null,
        modalOpen:boolean,
        copyAssModalOpen:boolean
    }
    options:{
        section_options:FinStateSection[],
        year_options:year[]
    }
    onChange:{
        year_changer: (year:number)=>void
        part_id_changer: (part_id:number)=>void
        setModalOpen:Dispatch<SetStateAction<boolean>>,
        setCopyAssModalOpen:Dispatch<SetStateAction<boolean>>
    }

}

export default function  DataAssignmentMenu(props:props){
    const { data: session, isPending } = authClient.useSession();
          
    const isAdmin = session?.user.role === 'admin';
    
    return(
        <Box sx={{
                    display: 'flex',
                    alignItems: 'center', // Vertical alignment
                    gap: 2,               // Spacing between components

                    justifyContent: 'center', // Horizontal center
                }}>
            
            <ChooseYear
                value={props.selection.year}
                options={props.options.year_options}
                onChange={props.onChange.year_changer}
            />
            <ChooseReportSection
                value={props.selection.part_id}
                options={props.options.section_options}
                onChange={props.onChange.part_id_changer}
            />
            {isAdmin ? <>
                <Button
                    onClick={() => props.onChange.setModalOpen(true)}
                >
                    Verser Données
                </Button>
                <Button
                    onClick={() => props.onChange.setCopyAssModalOpen(true)}
                >
                    Copier affectations à une autre année
                </Button>
            </> : <></>}
            
        </Box>


    )
}