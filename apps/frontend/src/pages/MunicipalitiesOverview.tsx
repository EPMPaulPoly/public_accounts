import { useEffect, useState } from "react"
import ChooseYear from "../components/selectors/ChooseYear"
import MenuBar from "../components/common/MenuBar"
import { type FileDBEquivalence, type municipalite , type regions, type year} from "@budgets_municipaux/common"
import UploadMunicipalititesManagement from "../components/controlBars/UploadMunicManagement"
import CreateYearModal from "../components/objectCreation/CreateYearModal"
import ModalVersementCSV from "../components/fileUpload/ModalVersementCSV"
import { ServiceFichierCSV } from "../services/common/serviceFichierCSV"
import MunicipalitiesTable from "../components/visualisation/MunicipalitiesTable"
import { Box } from "@mui/material"
import { useMunicipalitiesVisualization } from "../hooks/wrappers/MunicipalitiesOverview/useMunicipalitiesVisualisation"
import { ChooseRegion } from "../components/selectors/ChooseRegion"
import { Footer } from "../components/common/Footer"

function MunicipalitiesOverview(){
    const [dateModalOpen,setDateModalOpen] = useState<boolean>(false)
    const [municUploadModalOpen,setMunicUploadModalOpen] = useState<boolean>(false)
    const [equivalenceFDB, defEquivalenceFBD] = useState<FileDBEquivalence[]>(
            [
                {
                    db_column:'cod_geo',
                    column_description:'Identifiant municipalité',
                    file_column:``,
                    mandatory:true,
                    page:'Base'
                },
                {
                    db_column:'nom_organisme',
                    column_description:'Nom municipalité',
                    file_column:``,
                    mandatory:true,
                    page:'Base'
                },
                {
                    db_column:'desi_org',
                    column_description:"Désignation de l'organisation (ville, cité, etc..)",
                    file_column:``,
                    mandatory:true,
                    page:'Base'
                },
                {
                    db_column:'cod_mrc',
                    column_description:'Code de MRC',
                    file_column:``,
                    mandatory:true,
                    page:'Base'
                },
                {
                    db_column:'nom_mrc',
                    column_description:'Nom de MRC',
                    file_column:``,
                    mandatory:true,
                    page:'Base'
                },
                {
                    db_column:'cod_cm',
                    column_description:'Code Communauté metropolitaine',
                    file_column:``,
                    mandatory:true,
                    page:'Base'
                },
                {
                    db_column:'nom_cm',
                    column_description:'Nom Communauté metropolitaine',
                    file_column:``,
                    mandatory:true,
                    page:'Base'
                },
                {
                    db_column:'no_reg',
                    column_description:'Numéro Region',
                    file_column:``,
                    mandatory:true,
                    page:'Base'
                },
                {
                    db_column:'desc_reg',
                    column_description:'Description Region',
                    file_column:``,
                    mandatory:true,
                    page:'Base'
                },
                {
                    db_column:'type_org',
                    column_description:'Type organisation',
                    file_column:``,
                    mandatory:false,
                    page:'Base'
                },
                {
                    db_column:'population',
                    column_description:'Population',
                    file_column:``,
                    mandatory:false,
                    page:'Base'
                }
            ]
        )



    const viz=useMunicipalitiesVisualization()



    return(
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <MenuBar/>
        <div style={{verticalAlign:'center',justifyContent:'center'}}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center', // Vertical alignment
                    gap: 2,               // Spacing between components

                    justifyContent: 'center', // Horizontal center
                }}
                >
                
            <UploadMunicipalititesManagement
                dateModalOpen={dateModalOpen}
                setDateModalOpen={setDateModalOpen}
                uploadMunicModalOpen={municUploadModalOpen}
                setUploadMunicModalOpen={setMunicUploadModalOpen}
            />
            <ChooseRegion
                value={{region:viz.selection.region,region_type:viz.selection.region_type}}
                options={{region_options:viz.options?.regions??[],region_types:viz.options?.region_types??[]}}
                onChange={{reg_changer:viz.setRegion,reg_type_changer:viz.setRegionType}}
            />
            <ChooseYear 
                value={viz.selection.year}
                options={viz.options?.years??[]}
                onChange={viz.setYear}
            />
            </Box>
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
            <CreateYearModal
                open={dateModalOpen}
                setOpen={setDateModalOpen}
                yearOptions={viz.options?.years??[]}
                setYear={viz.setYear}
            />
            <ModalVersementCSV
                table='municipal_qc.municipalities'
                fieldsToFill={equivalenceFDB}
                setFieldsToFill={defEquivalenceFBD}
                modalOpen={municUploadModalOpen}
                setModalOpen={setMunicUploadModalOpen}
                serviceUploadPeek={ServiceFichierCSV.verseFichierFlux}
                serviceModDB={ServiceFichierCSV.confirmeMAJBDTemp}
                value={viz.selection.year}
                options={viz.options?.years??[]}
                onChangeValue={viz.setYear}
            />
            <MunicipalitiesTable
                value={{
                    page:viz.selection.page,
                    rows_per_page:viz.selection.rows_per_page
                }}
                options={{
                    rows_per_page_options:viz.options?.rows_per_page_options??[10,25]}}
                onChange={{
                    rows_per_page_changer:viz.setRowsPerPage,
                    page_changer:viz.setPage
                }}
                data={{
                    municipalities:viz.data?.municipalities??[],
                    totalCount:viz.data?.totalCount??0
                }}
            />
        </div>
        <Footer/>
    </div>
    )
}

export default MunicipalitiesOverview