
import { serviceIndicatorEquation } from "../../../services/mun/serviceMunicIndicators";
import { useVisualization } from "../../visualisation/useVisualisation";
import { municIndicCreateVizConfig } from "./config";

export function useMunicIndicatorsCreationVisualization() {
    const viz = useVisualization(
        municIndicCreateVizConfig
    )

    function setSelectedEquation(newEq: number | null) {
        viz.updateSelection(selection => ({
            ...selection,
            eq_id: newEq
        })
        )
    }

    async function setEqUpdateOrCreateFlag(newFlag: boolean) {
        viz.updateSelection(selection => ({
            ...selection,
            eq_create_flag: newFlag
        }))
    }

    function setSelectedVariable(var_sel: number | null) {
        viz.updateSelection(selection => ({
            ...selection,
            eq_var_id: var_sel
        }))
    }

    function setEqVarUpdateOrCreateFlag(varCreate: boolean) {
        viz.updateSelection(selection => ({
            ...selection,
            eq_var_create_flag: varCreate
        }))
    }
    function setPartId(newPartId:number|null){
        viz.updateSelection(selection=>({
            ...selection,
            part_id:newPartId
        }))
    }
    async function createEquation(newEqName: string) {
        const data = await serviceIndicatorEquation.createEquation(newEqName, '')
        if (data.success && data.data) {
            setSelectedEquation(data.data[0].eq_id)
            return true
        }
        return false
    }
    async function updateEquation({ eqId, newEqName, newEqExpr }: { eqId: number, newEqName: string, newEqExpr: string }) {
        const data = await serviceIndicatorEquation.updateEquation(eqId, newEqName, newEqExpr)
        if (data.success && data.data) {
            setSelectedEquation(data.data[0].eq_id)
            return true
        }
        return false
    }
    async function deleteEquation(eqToDelete: number | null) {
        if (eqToDelete !== null) {
            const data = await serviceIndicatorEquation.deleteEquations(eqToDelete)
            if (data.success) {
                setSelectedEquation(null)
            }
        }
    }
    async function createEquationVar(var_name:string,part_id:number,row_id:number,col_id:number,eq_id:number){
        const data = await serviceIndicatorEquation.createEquationVariable(eq_id,part_id,row_id,col_id,var_name)
        if (data.success&&data.data){
            return true
        }
        return false
    }

    async function updateEquationVar(eq_var_id:number,var_name:string,part_id:number,row_id:number,col_id:number,eq_id:number){
        const data = await serviceIndicatorEquation.updateEquationVariable(eq_var_id,eq_id,part_id,row_id,col_id,var_name)
        if (data.success&&data.data){
            return true
        }
        return false
    }
    return {
        ...viz,
        setEquation: setSelectedEquation,
        createEquation,
        deleteEquation,
        updateEquation,
        setEqUpdateOrCreateFlag,
        setSelectedVariable,
        setEqVarUpdateOrCreateFlag,
        setPartId,
        createEquationVar,
        updateEquationVar
    }
}