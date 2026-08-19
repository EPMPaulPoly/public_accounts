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
import { 
    FormControl,  
    InputLabel, 
    MenuItem, 
    Select
} from "@mui/material";
import { IndicatorConstantsDisplay } from "../components/visualisation/IndicatorConstantsDisplay";
import { AddConstantUseModal } from "../components/objectCreation/AddConstantUseModal";


function MunicIndicatorsCreation(){
    const viz= useMunicIndicatorsCreationVisualization()
    const [eqDefModalOpen,setEqDefModalOpen]=useState<boolean>(false);
    const [eqVarDefModalOpen,setEqVarDefModalOpen]=useState<boolean>(false);
    const [addConstantModalOpen,setAddConstantModalOpen]=useState<boolean>(false);

    const [variableDisp, setVariableDisp] = useState<'finstate'|'constants'>('finstate');
    const {setSnackMessage,setSnackOpen,setSnackSev,snackMessage,snackOpen,snackSev}=useAppContext()

    return(
        <div
            style={{ height: '100vh', display: 'flex', flexDirection: 'column' ,gap:'10px',overflow:'hidden'}}
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
            {viz.selection.eq_id&&(
            <span
                style={{
                    alignItems:'left',
                    justifyItems:'left'
                }}
            >
                <FormControl>
                    <InputLabel id="varTypes-lab" >
                        Provenance variables
                    </InputLabel>
                    <Select
                        labelId="varTypes-lab"
                        id="varTypes"
                        label='Provenance variables'
                        value={variableDisp}
                        onChange={(e)=>
                            e.target.value==='constants'||
                            e.target.value==='finstate'?
                            setVariableDisp(e.target.value):
                            console.log(e.target)
                        }
                        sx={{minWidth:'200px'}}
                    >
                        <MenuItem
                            key='finstate'
                            value='finstate'
                        >
                            État financiers
                        </MenuItem>
                        <MenuItem
                            key='constants'
                            value='constants'
                        >
                            Constantes
                        </MenuItem>
                    </Select>
                </FormControl>
            </span>)}
            <div
                style={{ 
                    flex: 1, 
                    overflow: 'auto' , 
                    width:'100%',
                    minWidth: 0,
                    minHeight: 0,
                    gap:'10px',
                }}
            >
                {/* Equation variables table*/}
                {
                    variableDisp==='finstate'?<>
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
                    </>:<>
                        <IndicatorConstantsDisplay
                            eq_id={viz.selection.eq_id}
                            data={viz.data?.equation_const??[]}
                            onAction={{
                                setConstantAddModalOpen:setAddConstantModalOpen,
                                forceUpdate:viz.forceUpdate
                            }}
                        />
                    </>
                }
                
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
                <AddConstantUseModal
                    selection={{
                        eq_id:viz.selection.eq_id,
                        addConstantModalOpen:addConstantModalOpen
                    }}
                    onAction={{
                        setAddConstantModalOpen:setAddConstantModalOpen,
                        forceUpdate:viz.forceUpdate
                    }}
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