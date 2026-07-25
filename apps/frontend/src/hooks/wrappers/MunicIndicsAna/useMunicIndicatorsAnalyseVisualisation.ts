

import { useVisualization } from "../../visualisation/useVisualisation";
import { municIndicCreateVizConfig } from "./config";

export function useMunicIndicatorsAnalysisVisualization() {
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
    function setCapitation(capitalizeNew:boolean){
        viz.updateSelection(selection=>({
            ...selection,
            capitation:capitalizeNew
        }))
    }
    function setAnaType(newAnaType:'trans'|'long'){
        viz.updateSelection(selection=>({
            ...selection,
            ana_type:newAnaType
        })
        )
    }

    function setAnaView(newAnaView:'chart'|'table'){
        viz.updateSelection(selection=>({
            ...selection,
            ana_view:newAnaView
        })
        )
    }

    function setYear(newYear:number|null){
        viz.updateSelection(selection=>({
            ...selection,
            year:newYear
        }))
    }

    function setRegionType(newRegionType:'cm'|'reg'|'mrc'|'aucun'){
        viz.updateSelection(selection=>({
            ...selection,
            reg_type:newRegionType
        }))
    }

    function setCity(newCity:number|null){
        viz.updateSelection(selection=>({
            ...selection,
            cod_geo:newCity
        }))
    }
    function setRegionId(newRegionId:string|null){
        viz.updateSelection(selection=>({
            ...selection,
            reg_id:newRegionId
        }))
    }



    return {
        ...viz,
        setSelectedEquation,
        setAnaType,
        setAnaView,
        setYear,
        setRegionType,
        setRegionId,
        setCity,
        setCapitation
    }
}