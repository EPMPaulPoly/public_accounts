import type { backend_response, BalanceSheet, ProfitAndLossStatement } from "@budgets_municipaux/common"
import api from "../api"

class ServiceESF{
    async getESFVille(city:number,year:number):Promise<backend_response<BalanceSheet>>{
        try{
            let base_query = `/bal-sheet?city=${city}&year=${year}`
            //const apiresponse = await api.get(base_query)
            return ({success:true,data:{
                fin_assets:[
                    {id:'2',description:'Cash',value:10000},
                    {id:'3',description:'Investments',value:10000}
                ],
                fin_liab:[
                    {
                        id:'4',
                        description:'Insuffisance de trésorerie',
                        value:13000
                    },
                    {id:'5',description:'Emprunts temporaires',value:10000}
                ],
                non_fin_assets:[
                    {id:'6',description:'Roads',value:3000}
                ],
                acc_defic:[{id:'7',description:'Cumulated deficits',value:0}]
            }})
        }catch(error:any){
            return ({success:false,message:'Error retrieving Balance Sheet'})
        }
    }
}

export const serviceESF = new ServiceESF()