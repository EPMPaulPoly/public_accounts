import type { 
    FinStateSecColWHelp, 
    FinStateSecRowWHelp, 
    FinStateSectionCol, 
    FinStateSectionRow 
} from "@budgets_municipaux/common";
import { 
    addColLevelEditFlagFields, 
    addRowLevelEditFlagFields 
} from "./addLevelEditFlagFields.js";
import { 
    addColMoveFlagField, 
    addRowMoveFlagField 
} from "./addMoveFlagFields.js";
import { 
    addColSiblings,
    addRowSiblings 
} from "./addSiblingsRows.js";

export function addRowHelperColumns(cleanRows:FinStateSectionRow[]):FinStateSecRowWHelp[]{
    const inter1=addRowLevelEditFlagFields(cleanRows)
    const inter2=addRowSiblings(inter1)
    const addMoveFlag=addRowMoveFlagField(inter2)
    return addMoveFlag
}




export function addColHelperColumns(cleanCols:FinStateSectionCol[]):FinStateSecColWHelp[]{
    const inter1=addColLevelEditFlagFields(cleanCols)
    const inter2=addColSiblings(inter1)
    const addMoveFlag=addColMoveFlagField(inter2)
    return addMoveFlag
}

