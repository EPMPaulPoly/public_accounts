import { useState } from "react";
import MenuBar from "../components/common/MenuBar";

import { Box } from "@mui/material";
import ManipReportParts from "../components/controlBars/ManipReportParts";
import ModalReportSectionModCreate from "../components/objectCreation/ModalReportSectionCreation";
import ReportPageCreator from "../components/objectCreation/ReportPageCreator";
import { useReportSetupVisualization } from "../hooks/wrappers/RepTemplateAndData/useReportSetupVisualization";
import { Footer } from "../components/common/Footer";
import { UserSnackCommunication } from "../components/common/UserSnackCommunication";
import { useAppContext } from "../context/contextProvider";
/**
 * 
 * @returns A React page which enables user to structure report and assign provincial ids to the relevan columns
 */

function MunRepTemplateAndData(){
    // Stuff related to selecting years which is not super important for structur
    // but is if your're looking to 

    // States relating to creating a new section in the report
    const [addReportSectionModalOpen,setAddReportSectionModalOpen]=useState<boolean>(false)
    
    // States relating to the structuring of the report page
    const [editing, setEditing] = useState<boolean>(false)
    
    const viz = useReportSetupVisualization()
    const{snackOpen,setSnackOpen,setSnackMessage,setSnackSev,snackMessage,snackSev}=useAppContext()
    return(
        <div style={{flexDirection:'column',overflow:'hidden',display:'flex',height:'100vh'}}>
            <MenuBar
                setSnackOpen={setSnackOpen}
                setSnackSev={setSnackSev}
                setSnackMessage={setSnackMessage}
            />
            <div>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center', // Vertical alignment
                    gap: 2,               // Spacing between components

                    justifyContent: 'center', // Horizontal center
                }}>
                <ManipReportParts
                    value={{
                        selected_part_id:viz.selection.part_id,
                        new_item_flag:viz.selection.new_part_flag
                    }}
                    options={viz.options?.report_pages??[]}
                    onChange={{
                        part_id_changer:viz.setReportPart,
                        new_flag_changer:viz.setNewFlag
                    }}
                    ResultUpdater={
                        {row_changer:viz.overrideRows,col_changer:viz.overrideCols}}
                    setAddReportSectionModalOpen={setAddReportSectionModalOpen}
                />
                </Box>
            </div>
            <div style={{
                flex:1,
                overflow:'auto',
                minHeight:0,
                minWidth:0
                }}>
                <ModalReportSectionModCreate
                    values={{
                        modalOpen:addReportSectionModalOpen,
                        reportPageToMod:viz.options?.report_pages.find((r)=>r.part_id===viz.selection.part_id)??null,
                        newPart:viz.selection.new_part_flag
                    }}
                    onChange={{
                        setModalOpen:setAddReportSectionModalOpen,
                        setReportPage:viz.setReportPart,
                        setNewPart:viz.setNewFlag
                    }}
                />
                <ReportPageCreator
                    editing={editing}
                    setEditing={setEditing}
                    selection={{
                        PartId:viz.selection.part_id,
                        RowEdit:viz.selection.row_edit,
                        ColEdit:viz.selection.col_edit
                    }}
                    onChangeLoc={{
                        setRowEdit:viz.rowChange,
                        setColEdit:viz.ColChange,
                        setPartId:viz.setReportPart
                    }}
                    data={{
                        rows:viz.data?.rows??[],
                        cols:viz.data?.cols??[]
                    }}
                    setData={{
                        updateRows:viz.overrideRows,
                        updateCols:viz.overrideCols
                    }}
                    forceDataUpdate={viz.forceUpdate}
                />

            </div>
            <UserSnackCommunication
                snackMessage={snackMessage}
                snackSev={snackSev}
                setSnackOpen={setSnackOpen}
                snackOpen={snackOpen}
            />
            <Footer/>
        </div>
    )
}

export default MunRepTemplateAndData