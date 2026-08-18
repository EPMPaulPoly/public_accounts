import type { IndicatorConstant } from "@budgets_municipaux/common";
import { ChooseConstant } from "../selectors/ChooseConstant";
import { ConstantVisualisation } from "./ConstantVisualisation";
import type { Dispatch, SetStateAction } from "react";

interface CMPProps{
    selection:{const_id:number|null}
    options:{
        constOptions:IndicatorConstant[]
    },
    onAction:{
        onCreation: ()=>Promise<void>
        onSelect:(newConstId:number|null)=>void
        onDelete:(constToDelete:number)=>Promise<boolean>
        setConstEditModalOpen:Dispatch<SetStateAction<boolean>>
    }
    constToMod:IndicatorConstant|null
}

export function ConstantsManipPanel(props:CMPProps) { 
    return (
        <div 
            style={{
                flexGrow:1,
                flexDirection:'row',
                display:'flex',
                padding:'10px',
                overflow:'hidden'
            }}
        >  
            <ChooseConstant
                selection={{constantSel:props.selection.const_id}}
                options={{constants:props.options.constOptions}}
                onAction={{
                    createNewConstant:props.onAction.onCreation,
                    setConstantSelect:props.onAction.onSelect,
                    deleteConstant:props.onAction.onDelete
                }}
            />
            
            <ConstantVisualisation
                data={props.constToMod}
                onAction={{
                    setEditModalOpen:props.onAction.setConstEditModalOpen
                }}
            />
            
        </div>
    )
}
