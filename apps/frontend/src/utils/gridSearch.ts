import type { FinStateAssignGrid } from "@budgets_municipaux/common";


/**
 * Function used to return a match id based on row and column. Used in bu
 * @param grid a Financial statement assignement grid which shows row column and field assignment
 * @param rowIdLoc row location in grid, uses row id which will be different than its location
 * @param colIdLoc row location in grid, uses col_id which is the DB identifier
 * @returns the required match id or relevant value if nothing was found
 */
export function getAssignFromGrid(grid:FinStateAssignGrid[]|null,rowIdLoc:number|null,colIdLoc:number|null):string|number|null{
        let res:number|string|null;
        try{
        if (grid!==null&&rowIdLoc!==null&&colIdLoc!==null){
            res=grid
                .find(r => r.row_id === rowIdLoc)
                ?.cells
                .find(c => c.col_id === colIdLoc)
                ?.match_id ?? null
        }else{
            res=null
        }
        return res
    }catch(error:any){
        console.log('hit error in match_id find: getAssignFromGrid')
        return null
    }
    }
/**
 * Function used to return a match id based on row and column. Used in bu
 * @param grid a Financial statement assignement grid which shows row column and field assignment
 * @param rowIdLoc row location in grid, uses row id which will be different than its location
 * @param colIdLoc row location in grid, uses col_id which is the DB identifier
 * @returns the required match id or relevant value if nothing was found
 */
export function getCodeFromGrid(grid:FinStateAssignGrid[]|null,rowIdLoc:number|null,colIdLoc:number|null):string|null{
        let res:number|string|null;
        try{
        if (grid!==null&&rowIdLoc!==null&&colIdLoc!==null){
            res=grid
                .find(r => r.row_id === rowIdLoc)
                ?.cells
                .find(c => c.col_id === colIdLoc)
                ?.prov_rep_id ?? null
        }else{
            res=null
        }
        return res
    }catch(error:any){
        console.log('hit error in match_id find: getAssignFromGrid')
        return null
    }
    }