import { useState } from "react";
import MenuBar from "../components/common/MenuBar";
import MunicIndicatorCreateControlBar from "../components/controlBars/MunicIndicatorsCreateControlBar";
import { 
    useMunicIndicatorsCreationVisualization 
} from "../hooks/wrappers/MunicIndicsCreation/useMunicIndicatorsCreateVisualisation";
import { 
    CreateMunicIndicatorModal 
} from "../components/objectCreation/CreateMunicIndicatorModal";
import { 
    IndicatorEquationDisplay 
} from "../components/visualisation/IndicatorEquationDisplay";
import IndicatorVariablesDisplay from "../components/visualisation/IndicatorVariablesDisplay";
import CreateModMunicIndVarModal from "../components/objectCreation/CreateModMunicIndVarModal";
import { Footer } from "../components/common/Footer";
import { useAppContext } from "../context/contextProvider";
import { UserSnackCommunication } from "../components/common/UserSnackCommunication";


function MunicIndicatorsCreation(){
    const viz= useMunicIndicatorsCreationVisualization()
    const [eqDefModalOpen,setEqDefModalOpen]=useState<boolean>(false);
    const [eqVarDefModalOpen,setEqVarDefModalOpen]=useState<boolean>(false);
     
    const {setSnackMessage,setSnackOpen,setSnackSev,snackMessage,snackOpen,snackSev}=useAppContext()


    return(
        <div
            style={{ height: '100vh', display: 'flex', flexDirection: 'column' ,gap:'10px'}}
        >
            <div>
                <MenuBar
                    setSnackMessage={setSnackMessage}
                    setSnackOpen={setSnackOpen}
                    setSnackSev={setSnackSev}
                />
            </div>
            <div
                style={{padding:'5px'}}
            >
                {/* Choose create delete equation*/}
                <MunicIndicatorCreateControlBar
                    value={viz.selection.eq_id}
                    onChange={viz.setEquation}
                    onModalOpen={setEqDefModalOpen}
                    onChangeEditFlage={viz.setEqUpdateOrCreateFlag}
                    options={viz.options?.equations??[]}
                />
            </div>
            <div>
                {/* equation formulation and name*/}

                <IndicatorEquationDisplay
                    values={viz.selection.eq_id}
                    options={viz.options?.equations??[]}
                    actions={{
                        setWindowOpen:setEqDefModalOpen,
                        setCreateFlag:viz.setEqUpdateOrCreateFlag
                    }}
                />
            </div>
            <span></span>
            <div
                style={{ 
                    flex: 1, 
                    overflow: 'auto' , 
                    width:'100%',
                    minWidth: 0,
                    minHeight: 0,
                }}
            >
                {/* Equation variables table*/}

                <IndicatorVariablesDisplay
                    selection={{
                        part_id:viz.selection.part_id,
                        eq_id:viz.selection.eq_id
                    }}
                    options={{
                        parts:viz.options?.parts??[],
                        rows:viz.options?.rows??[],
                        cols:viz.options?.cols??[]
                    }}
                    onEdit={{
                        setModifiedVar:viz.setSelectedVariable,
                        setVarCreateEditFlag:viz.setEqVarUpdateOrCreateFlag,
                        setModalOpen:setEqVarDefModalOpen
                    }}
                    data={viz.data?.equation_vars??[]}
                />
                <CreateMunicIndicatorModal
                    values={{
                        modalOpen:eqDefModalOpen,
                        currentEquation:viz.selection.eq_id,
                        createFlag:viz.selection.eq_create_flag,
                    }}
                    options={{
                        equations:viz.options?.equations??[],
                        variables:viz.data?.equation_vars??[]
                    }}
                    onNew={viz.createEquation}
                    onUpdate={viz.updateEquation}
                    setModalOpen={setEqDefModalOpen}
                />
                <CreateModMunicIndVarModal
                    values={{
                        modalOpen:eqVarDefModalOpen,
                        eqVarId:viz.selection.eq_var_id,
                        eqVarCreateFlag:viz.selection.eq_var_create_flag,
                        partId:viz.selection.part_id,
                        eqId:viz.selection.eq_id
                    }}
                    onClose={setEqVarDefModalOpen}
                    options={{
                        parts:viz.options?.parts??[],
                        rows:viz.options?.rows??[],
                        cols:viz.options?.cols??[]
                    }}
                    onChange={{
                        partChanger:viz.setPartId,
                        eqVarChanger:viz.setSelectedVariable,
                        createFlagChanger:viz.setEqVarUpdateOrCreateFlag
                    }}
                    onNew={viz.createEquationVar}
                    onUpdate={viz.updateEquationVar}
                    data={viz.data?.equation_vars??[]}
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

export default MunicIndicatorsCreation