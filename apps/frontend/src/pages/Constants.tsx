import { useState } from "react"
import { Footer } from "../components/common/Footer"
import MenuBar from "../components/common/MenuBar"
import { UserSnackCommunication } from "../components/common/UserSnackCommunication"
import { ConstantsManipPanel } from "../components/visualisation/ConstantsManipPanel"
import { useAppContext } from "../context/contextProvider"
import { useConstantsVisualisation } from "../hooks/wrappers/Constants/useConstantsVisualisation"
import { ConstantUpdateModal } from "../components/objectCreation/ConstantUpdateModal"


export function Constants(){
    
    const {setSnackMessage,setSnackOpen,setSnackSev,snackMessage,snackOpen,snackSev}=useAppContext()
    const viz=useConstantsVisualisation()
    const [constEditModalOpen,setConstEditModalOpen]=useState<boolean>(false);
    return (
        <div
            style={{
                overflow:'hidden',
                height:'100vh',
                display:'flex',
                flexDirection:'column'
            }}
        >
            <MenuBar
                setSnackOpen={setSnackOpen}
                setSnackMessage={setSnackMessage}
                setSnackSev={setSnackSev}
            />
            <ConstantsManipPanel
                selection={{const_id:viz.selection.const_id}}
                options={{constOptions:viz.options?.constOptions??[]}}
                onAction={{
                    onCreation:viz.createConstant,
                    onSelect:viz.setConstant,
                    onDelete:viz.deleteConstant,
                    setConstEditModalOpen:setConstEditModalOpen
                }}
                constToMod={viz.data?.constToMod??null}
            />
            <ConstantUpdateModal
                values={{
                    modalOpen:constEditModalOpen,
                    selectedConst:viz.selection.const_id
                }}
                onAction={{
                    setModalOpen:setConstEditModalOpen,
                    saveConstant:viz.updateConstant,
                    forceUpdate:viz.forceUpdate
                }}
                data={{
                    constEdit:viz.data?.constToMod??null
                }}
            />
            <UserSnackCommunication
                snackOpen={snackOpen}
                snackMessage={snackMessage}
                snackSev={snackSev}
                setSnackOpen={setSnackOpen}
            />
            <Footer/>
        </div>
    )
}

