import { Box, Dialog, Divider } from "@mui/material"
import { useState, type Dispatch, type SetStateAction } from "react"
import FileUploadBox from "./FileUploadBox"
import ColumnDropDownListStd from "./ColumnDropDownListStd"
import ColumnDropDownListPageSelector from "./ColumnDropDownListPageSelector"
import ColumnDropDownListGeom from "./ColumnDropDownListGeom"
import BoutonApprobationVerse from "./BoutonApprobationVerse"
import type { EquivalenceCSVCoordPoint, FileDBEquivalence,mappingLine,mappingPoint, year } from "@budgets_municipaux/common"
import ChooseYear from "../selectors/ChooseYear"

interface props{
    table:'municipal_qc.municipalities'|'municipal_qc.data'
    fieldsToFill:FileDBEquivalence[]
    setFieldsToFill: Dispatch<SetStateAction<FileDBEquivalence[]>>
    geomFieldsToFill?:EquivalenceCSVCoordPoint[]
    setGeomFieldsToFill?:Dispatch<SetStateAction<EquivalenceCSVCoordPoint[]>>
    modalOpen:boolean
    setModalOpen:Dispatch<SetStateAction<boolean>>,
    value:number|null,
    options:year[]
    onChangeValue:(value:number)=>void
    serviceUploadPeek: (
        file:File,
        setProgress:Dispatch<SetStateAction<number>>
    )=>Promise<{
        tempFileId:string,
        columns:string[]
    }>
    serviceModDB:(
        fileID:string,
        regularMapping:Record<string,string>,
        table:string,
        updateYear:number,
        CartoMapping?:Record<string,mappingLine|mappingPoint>
    )=>Promise<{
        success:boolean,
        data:number
    }>
}

function ModalVersementCSV (props:props){
    let allPages = props.fieldsToFill.map((item)=>String(item.page))
    if(props.geomFieldsToFill!== undefined){
        props.geomFieldsToFill.map((item)=>allPages.push(String(item.page)))
    }
    let pages  = Array.from(new Set(allPages))
    if (pages.includes('undefined')){
        pages = pages.map((item)=>{if (item==='undefined'){return 'Autres'}else{return item}})
    }
    const [pageAct,defPageAct] = useState<string>(pages[0])
    const [colonnesFichier, defColonnesFichier] = useState<string[]>([]);
    const [idFichier,defIdFichier] = useState<string>('');
    const sxBox = {
                    overflowX: 'hidden',
                    overflowY: 'automatic',
                    paddingTop: '20px',
                    padding: '10px',
                    display: 'grid',
                    gap: '10px',
                    width:'420px'
                }

    return(<>
        <Dialog
            open={props.modalOpen}
            onClose={() => props.setModalOpen(false)}
        >
            <Box
                sx={sxBox}
            >   
                <ChooseYear
                    value={props.value}
                    options={props.options}
                    onChange={props.onChangeValue}
                />
                <FileUploadBox
                    colonnesFichier={colonnesFichier}
                    defColonnesFichier={defColonnesFichier}
                    idFichier={idFichier}
                    defIdFichier={defIdFichier}
                    accept='.csv'
                    title='Fichier CSV'
                    serviceUploadPeak={props.serviceUploadPeek}
                />
                
                <ColumnDropDownListPageSelector
                    colonnesFichier={colonnesFichier}
                    defColonnesFichier={defColonnesFichier}
                    pageAct={pageAct}
                    defPageAct={defPageAct}
                    pages={pages}
                />
                
                <ColumnDropDownListStd
                    colonnesFichier={colonnesFichier}
                    defColonnesFichier={defColonnesFichier}
                    champsARemplir={props.fieldsToFill}
                    defChampsARemplir={props.setFieldsToFill}
                    pageAct={pageAct}
                />
                
                {
                    props.geomFieldsToFill&&props.setGeomFieldsToFill&&<>
                    <ColumnDropDownListGeom
                        colonnesFichier={colonnesFichier}
                        defColonnesFichier={defColonnesFichier}
                        champsgeomARemplir={props.geomFieldsToFill}
                        defChampsGeomARemplir={props.setGeomFieldsToFill}
                        pageAct={pageAct}
                    />
                    </>
                }
                <BoutonApprobationVerse
                    modalOuvert={props.modalOpen}
                    defModalOuvert={props.setModalOpen}
                    champsARemplir={props.fieldsToFill}
                    champsGeomARemplir={props.geomFieldsToFill}
                    serviceMAJ={props.serviceModDB}
                    idFichier={idFichier}
                    table={props.table}
                    annee={props.value}
                />
            </Box>
        </Dialog>
    </>)
}

export default ModalVersementCSV