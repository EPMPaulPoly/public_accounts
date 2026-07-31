import { useEffect, useState } from "react";
import MenuBar from "../components/common/MenuBar";

import DataAssignmentMenu from "../components/controlBars/DataAssignmentMenuBar";
import ModalVersementCSV from "../components/fileUpload/ModalVersementCSV";
import {
    type FileDBEquivalence,
} from "@budgets_municipaux/common";
import { ServiceFichierCSV } from "../services/common/serviceFichierCSV";
import GridAssignTable from "../components/visualisation/GridAssignTable";
import ModalProvIdAssign from "../components/objectCreation/ModalProvIdAssign";
import CopyAssignmentsModal from "../components/objectCreation/CopyAssignmentsModal";
import { useReportAssignVisualization } from "../hooks/wrappers/MunRepAssignIds/useReportAssignVisualization";
import { Footer } from "../components/common/Footer";
import { useAppContext } from "../context/contextProvider";
import { UserSnackCommunication } from "../components/common/UserSnackCommunication";

export default function ReportSetup() {

    const [assModalOpen,setAssModalOpen]= useState<boolean>(false)
    const [copyAssModalOpen,setCopyAssModalOpen]=useState<boolean>(false);



   
    // States relating to uploading data from the open website which has been formatted 
    // to be compatible with database structure
    const [dataUploadModalOpen, setDataUploadModalOpen] = useState<boolean>(false)
    const [equivalenceFDB, setEquivalenceFDB] = useState<FileDBEquivalence[]>([
        {
            db_column: 'prov_rep_id',
            page: 'Base',
            file_column: '',
            column_description: 'Identifiant fichier provincial',
            mandatory: true
        },
        {
            db_column: 'value',
            page: 'Base',
            file_column: '',
            column_description: 'Numeric values',
            mandatory: true
        },
        {
            db_column: 'value_text',
            page: 'Base',
            file_column: '',
            column_description: 'Text values and notes',
            mandatory: true
        },
        {
            db_column: 'cod_geo',
            page: 'Base',
            file_column: '',
            column_description: 'Identifiant organisme',
            mandatory: true
        }
    ])
    const viz = useReportAssignVisualization()

    const{snackOpen,setSnackOpen,setSnackMessage,setSnackSev,snackMessage,snackSev}=useAppContext()
    return (
        <div style={{flexDirection:'column',overflow:'hidden',display:'flex',height:'100vh'}}>
            <div>
                <MenuBar 
                    setSnackMessage={setSnackMessage}
                    setSnackOpen={setSnackOpen}
                    setSnackSev={setSnackSev}
                />
            </div>
            <div>
                <DataAssignmentMenu
                    
                    
                    selection={{
                        year:viz.selection.year,
                        part_id:viz.selection.part_id,
                        modalOpen:dataUploadModalOpen,
                        copyAssModalOpen:copyAssModalOpen
                    }}
                    options={{
                        year_options:viz.options?.year_opts??[],
                        section_options:viz.options?.report_pages_opts??[]
                    }}
                    onChange={{
                        year_changer:viz.setYear,
                        part_id_changer:viz.setReportPart,
                        setModalOpen:setDataUploadModalOpen,
                        setCopyAssModalOpen:setCopyAssModalOpen
                    }}
                />
            </div>
            <div style={{flex:1,overflow:'auto'}}>
                <ModalVersementCSV
                    table='municipal_qc.data'
                    modalOpen={dataUploadModalOpen}
                    setModalOpen={setDataUploadModalOpen}
                    fieldsToFill={equivalenceFDB}
                    setFieldsToFill={setEquivalenceFDB}
                    serviceModDB={ServiceFichierCSV.confirmeMAJBDTemp}
                    serviceUploadPeek={ServiceFichierCSV.verseFichierFlux}
                    value={viz.selection.year}
                    options={viz.options?.year_opts??[]}
                    onChangeValue={viz.setYear}
                />
                <GridAssignTable
                    selection={{
                        year:viz.selection.year,
                        page:viz.selection.part_id,
                        rowEdit:viz.selection.row_edit,
                        colEdit:viz.selection.col_edit,
                        codeAssignModalOpen:assModalOpen
                    }}
                    onChangeSel={{
                        setColEdit:viz.ColChange,
                        setRowEdit:viz.rowChange,
                        setCodeAssignModalOpen:setAssModalOpen,
                        setSelectedCode:viz.setSelectedCode,
                        setMatch:viz.setMatch
                    }}
                    data={viz.data??[]}
                    onChangeData={viz.overrideGrid}
                />
                <ModalProvIdAssign
                    selection={{
                        modalOpen:assModalOpen,
                        rowId:viz.selection.row_edit,
                        colId:viz.selection.col_edit,
                        rowPerPage:viz.selection.prov_ids_per_page,
                        totalCount:viz.selection.total_prov_ids,
                        year:viz.selection.year,
                        codeStart:viz.selection.prov_id_search,
                        reportPage:viz.selection.part_id,
                        tablePage:viz.selection.prov_id_select_page,
                        selectedCode:viz.selection.prov_rep_id
                    }}
                    options={{
                        codeOptions:viz.options?.provincial_ids_opts??[]
                    }}
                    onChange={{
                        setModalOpen:setAssModalOpen,
                        setRowId:viz.rowChange,
                        setColId:viz.ColChange,
                        setRowsPerPage:viz.setRowsPerPage,
                        setTablePage:viz.setTablePage,
                        setCodeStart:viz.setSearchStr,
                        setSelectedCode:viz.setSelectedCode
                    }}
                    data={viz.data}
                    setData={viz.overrideGrid}
                />
                <CopyAssignmentsModal
                    open={copyAssModalOpen}
                    setOpen={setCopyAssModalOpen}
                    yearOptions={viz.options?.year_opts??[]}
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