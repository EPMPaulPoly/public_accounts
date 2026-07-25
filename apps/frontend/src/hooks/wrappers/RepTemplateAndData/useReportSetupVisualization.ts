
import type { FinStateSecColWHelp, FinStateSecRowWHelp } from "@budgets_municipaux/common";
import { useVisualization } from "../../visualisation/useVisualisation";
import { reportSetupConfig } from "./config";

export function useReportSetupVisualization() {

    const viz = useVisualization(
        reportSetupConfig
    );
    

    function setReportPart(part_id:number|null) {
        viz.updateSelection(selection => ({
            ...selection,
            part_id:part_id,
        }));
    }
    function rowChange(newRow:number|null) {
        viz.updateSelection(selection => ({
            ...selection,
            row_edit:newRow,
        }));
    }
    function ColChange(newCol:number|null){
        viz.updateSelection(selection => ({
            ...selection,
            col_edit:newCol,
        }));
    }
    function overrideRows(rows:FinStateSecRowWHelp[]){
        viz.updateData(data => ({
            ...data,
            rows:rows,
        }));
    }
    function overrideCols(cols:FinStateSecColWHelp[]){
        viz.updateData(data=>({
            ...data,
            cols:cols
        })

        )
    }
    async function forceUpdate(){
        await reportSetupConfig.getData(viz.selection)
    }
    function setNewFlag(newFlag:boolean){
        viz.updateSelection(selection => ({
            ...selection,
            new_part_flag:newFlag,
        }));
    }

    return {
        ...viz,
        setReportPart,
        rowChange,
        ColChange,
        overrideRows,
        overrideCols,
        forceUpdate,
        setNewFlag
    };
}