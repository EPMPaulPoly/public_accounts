
import { EquationCalcPrecursor, EquationDef } from "@budgets_municipaux/common";
import { db } from "../../../db/db.js";
import { reformatEqPrecursorForCalc } from "../../../utils/reformatEqPrecursForCalc.js";
import { 
    addConstantUseRepo,
    createEquationCalcRepo,
    createEquationVarCalcRepo,
    deleteConstantUseRepo,
    deleteEquationCalcRepo,
    deleteEquationVarCalcRepo,
    getEqsRepo, 
    getEquationCalcPrecRepo, 
    getEqVariablesRepo, 
    updateEquationCalcRepo,
    updateEquationVarCalcRepo
} from "../../repositories/municipal/munic_eqs.repositories.js";
import { constantsRepositories } from "../../repositories/common/constants.repositories.js";

import { create, all, type MathScope } from "mathjs";
import { addConstantsToCalcPrec } from "../../../utils/addConstantsToCalcPrec.js";


class MunicEqsService {
    async getEquationsService({
        eq_id,
    }: {
        eq_id: number | undefined,
    }) {
        let data
        if (eq_id!==undefined){
            data = getEqsRepo(db,[eq_id])
        }else{
            data = getEqsRepo(db)
        }
        return data
    }
    async getVariablesService({eq_id,eq_var_id}:{eq_id?:number,eq_var_id?:number}){

        const data = getEqVariablesRepo(db,eq_id,eq_var_id)  
        return data
    }
    async getEquationResults({
        eq_id,
        jur_type,
        jur_id,
        year,
        capitation
    }:{
        eq_id:number,
        jur_type?:'mun'|'cm'|'reg'|'mrc',
        jur_id?:string|number,
        year?:number|undefined
        capitation?:boolean
    }){
        const data =await db.transaction().execute(async (trx)=>{
            const prec= await getEquationCalcPrecRepo(
                trx,{
                    eq_id:eq_id,
                    jur_type:jur_type,
                    jur_id:jur_id,
                    year:year
                })
            const constData= await constantsRepositories.getConstantsRepo(trx,{eq_id:eq_id})
            return {accounts:prec,constants:constData}
        })
        const math = create(all!);
        const dataTrans = data.accounts as unknown as EquationCalcPrecursor[]
        const formatted = reformatEqPrecursorForCalc(dataTrans)
        const formattedWConsts=addConstantsToCalcPrec(formatted,data.constants)
        let result
        if (capitation===true){
            result = formattedWConsts.map((r)=>{return {...r,result:math.evaluate('('+r.eq_expression+')/population',r.scope as MathScope)}})
        }else{
            result = formattedWConsts.map((r)=>{return {...r,result:math.evaluate(r.eq_expression,r.scope as MathScope)}})
        }
        
        return result
    }

    async createEquation(eq_name:string,eq_expression:string){
        const data = await createEquationCalcRepo(db,eq_name,eq_expression)
        return data
    }
    async updateEquation(eq_id:number,eq_name:string,eq_expression:string){
        const data = await updateEquationCalcRepo(db,eq_id,eq_name,eq_expression)
        return data
    }
    async createEquationVar(eq_var_symbol:string,eq_id:number,part_id:number,row_id:number,col_id:number){
        const data= await createEquationVarCalcRepo(
            db,
            eq_id,
            eq_var_symbol,
            part_id,
            row_id,
            col_id
        )
        return data
    }
    async updateEquationVar(eq_var_id:number,eq_var_symbol:string,eq_id:number,part_id:number,row_id:number,col_id:number){
        const data= await updateEquationVarCalcRepo(
            db,
            eq_var_id,
            eq_id,
            eq_var_symbol,
            part_id,
            row_id,
            col_id
        )
        return data
    }
    async deleteEquation(eq_id:number){
        const data = await deleteEquationCalcRepo(db,eq_id)
        return data
    }
    async deleteEquationVar(eq_var_id:number){
        const data = await deleteEquationVarCalcRepo(db,eq_var_id)
        return data
    }

    /**addConstantUse
     * adds a constant to the constant which can be used in a calculation
     * @param eq_id equation in which we're going to use the constant
     * @param const_id the constant being added 
     * @returns the constant use assignement
     */
    async addConstantUseServ(eq_id:number,const_id:number){
        const data = await addConstantUseRepo(db,eq_id,const_id)
        return data
    }

    /**deleteConstantUse 
     * removes a constant from being used in an equation. 
     * @param use_id the use of a constant to delete
     * @returns the delete constant use assignement
     */
    async deleteConstantUseServ(use_id:number){
        const result= db.transaction().execute(async(trx)=>{
            let data:{
                    eq_id: number;
                    use_id: number;
                    const_id: number;
                }[]=[]
            const relevantConstants = await constantsRepositories.getConstantsRepo(trx,{
                use_id:use_id
            })
            const relevantEquations= Array.from(new Set([...relevantConstants.map((cst)=>cst.eq_id)])).filter((val)=>val!==undefined)
            const relevantSymbols= Array.from(new Set([...relevantConstants.map((cst)=>cst.symbol)])).filter((val)=>val!==undefined)
            if(relevantEquations.length>0){
                const equations = await getEqsRepo(trx,relevantEquations)
                if (equations){
                    const equationsToUpdate = equations.map((eq)=>{return{...eq,eq_expression:relevantSymbols.reduce((expression, rs) => expression.replaceAll(rs, '1'),eq.eq_expression)}}) 
                    for (const eq of equationsToUpdate) {
                        await updateEquationCalcRepo(
                            trx,
                            eq.eq_id,
                            eq.eq_name,
                            eq.eq_expression
                        );
                    }
                }
                data = await deleteConstantUseRepo(trx,use_id)
            }
            return data
        })
        return result
    }
}


export const municEqsService = new MunicEqsService()