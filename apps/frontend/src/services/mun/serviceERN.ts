import type { backend_response, ProfitAndLossStatement } from "@budgets_municipaux/common"
import api from "../api"

class ServiceERN{
    async getERNVille(city:number,year:number,get_sub_items?:boolean):Promise<backend_response<ProfitAndLossStatement>>{
        try{
            let base_query = `/profit-and-loss?city=${city}&year=${year}`
            if (get_sub_items){
                base_query +='&sub_items=true'
            }
            //const apiresponse = await api.get(base_query)
            return ({success:true,data:{
                revenues:[
                    {id:'2',description:'Taxes',value:10000},
                    {id:'3',description:'Subventions',value:10000}
                ],
                expenses:[
                    {
                        id:'4',
                        description:'Rémunération',
                        value:10000,
                        components:[{id:'7',description:'Élus',value:5000},{id:'8',description:'Staff',value:5000}]
                    },
                    {id:'5',description:'Énergie',value:10000}
                ]}})
        }catch(error:any){
            return ({success:false,message:'Error retrieving P&L'})
        }
    }
}

export const serviceERN = new ServiceERN()