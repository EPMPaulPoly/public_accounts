import type { backend_response, EquationDef, EqVarWDesc } from "@budgets_municipaux/common"
import api from "../api"


class ServiceIndicatorEquation{
    async getEquations(eq_id?:number):Promise<backend_response<EquationDef[]>>{
        try {
            let base_query='/munic/indicators/equation'
            let query_adds:string[]=[]
             if (eq_id){
                query_adds.push(`eq_id=${eq_id}`)
            }
            if (query_adds.length>0){
                base_query+='?'+query_adds.join('&')
            }
            const data = await api.get(base_query)
            console.table(data.data.data)
            return {success:true,data:data.data.data}
        } catch (error:any) {
            console.log('error retriving equations')
            return {success:false,message:'Error retrieving equation'}
        }
    }
    async createEquation(equation_name:string,equation_def:string){
        try {
            let base_query='/munic/indicators/equation'
            const body={
                eq_name:equation_name,
                eq_expression:equation_def
            }
            const data = await api.post(base_query,body)
            return {success:true,data:data.data.data}
        } catch (error:any) {
            return {success:false,message:'Error retrieving equation'}
        }
    }
    async updateEquation(equation_id:number,equation_name:string,equation_def:string){
        try {
            let base_query=`/munic/indicators/equation/${equation_id}`
            const body={
                eq_name:equation_name,
                eq_expression:equation_def
            }
            const data = await api.put(base_query,body)
            return {success:true,data:data.data.data}
        } catch (error:any) {
            return {success:false,message:'Error retrieving equation'}
        }
    }
    async getVariables(eq_id:number):Promise<backend_response<EqVarWDesc[]>>{
        try {
            const base_query= `/munic/indicators/variable?eq_id=${eq_id}`
            const data = await api.get(base_query)
            return {success:true, data:data.data.data}
        } catch (error:any) {
            return {success:false,message:'error retrieving equation variables'}
        }
    }
    async createEquationVariable(eq_id:number,part_id:number,row_id:number,col_id:number,eq_var_symbol:string){
        try {
            const base_query='/munic/indicators/variable'
            const body={
                eq_id:eq_id,
                part_id:part_id,
                row_id:row_id,
                col_id:col_id,
                eq_var_symbol:eq_var_symbol
            }
            const data = await api.post(base_query,body)
            return {success:true, data:data.data}
        } catch (error:any) {
            return{success:false,message:'Error in creating equation variable'}
        }
    }
    async updateEquationVariable(eq_var_id:number,eq_id:number,part_id:number,row_id:number,col_id:number,eq_var_symbol:string){
        try {
            const base_query=`/munic/indicators/variable/${eq_var_id}`
            const body={
                eq_id:eq_id,
                part_id:part_id,
                row_id:row_id,
                col_id:col_id,
                eq_var_symbol:eq_var_symbol
            }
            const data = await api.put(base_query,body)
            return {success:true, data:data.data}
        } catch (error:any) {
            return{success:false,message:'Error in creating equation variable'}
        }
    }
    async getResults({
        eq_id,
        jur_id,
        jur_type,
        year,
        cod_geo,
        capitation
    }:{
        eq_id:number,
        jur_id?:string|number|null,
        jur_type?:'cm'|'aucun'|'mrc'|'reg'|'mun',
        year?:number|null,
        cod_geo?:number|null,
        capitation?:boolean
    }){
        try {
            let query='/munic/indicators/result';
            let query_add=[]
            if (eq_id){
                query_add.push(`eq_id=${eq_id}`)
            }
            if(cod_geo!==null &&cod_geo!==undefined){
                query_add.push(`jur_type=mun`)
                query_add.push(`jur_id=${cod_geo}`)
            }else if (jur_id&&jur_type){ 
                query_add.push(`jur_id=${jur_id}`)
                query_add.push(`jur_type=${jur_type}`)
            }
            if(year){
                query_add.push(`year=${year}`)
            }
            if(capitation){
                query_add.push(`capitation=${capitation}`)
            }
            if (query_add.length>0){
                query+='?'+query_add.join('&')
            }
            const data = await api.get(query)
            return{success:true,data:data.data.data}
        } catch (err:any) {
            return {success:false,message:'error retrieving results'}
        }
    }
    async deleteEquations(eq_id:number){
        try {

            return {success:true}
        } catch (error:any) {
            return {success:false}
        }
    }
}
export const serviceIndicatorEquation= new ServiceIndicatorEquation()