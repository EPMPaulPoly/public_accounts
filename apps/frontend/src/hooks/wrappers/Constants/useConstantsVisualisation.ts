

import type { IndicatorConstant } from "@budgets_municipaux/common";
import { serviceConstants } from "../../../services/common/serviceConstants";
import { useVisualization } from "../../visualisation/useVisualisation";
import { constantCreateVizConfig } from "./config";

export function useConstantsVisualisation() {
    const viz = useVisualization(
        constantCreateVizConfig
    )

    function setConstant(newConstId:number|null){
        viz.updateSelection(selection=>({
            ...selection,
            const_id:newConstId
        }))
    }

    async function createConstant(){
        const data = await serviceConstants.createNewConstant()
        if (data.success){
            viz.updateSelection(selection=>({
                ...selection,
                const_id:data.data[0].const_id
            }))
        }
    }

    async function deleteConstant(constToDelete:number){
        const data = await serviceConstants.deleteConstant(constToDelete)
        if (data.success){
            viz.updateSelection(selection=>({
                ...selection,
                const_id:null
            }))
        }
        return data.success
    }


    async function updateConstant(ConstUpdate:IndicatorConstant){
        const { const_id, ...rest } = ConstUpdate;
        const data = await serviceConstants.updateConstant(const_id,rest)
        return data.success
    }

    async function forceUpdate() {
        viz.updateSelection(selection=>({
            ...selection
        }))
    }

    return {
        ...viz,
        setConstant,
        createConstant,
        deleteConstant,
        updateConstant,
        forceUpdate
    }
}

