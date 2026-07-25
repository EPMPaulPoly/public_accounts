import type { BalanceSheet } from "@budgets_municipaux/common";
import { UseCityYearChange } from "./UseCityYearChange";
import { serviceESF } from "../../services/mun/serviceESF";


export function UseESFCityYearChange(){
    const handleERNCityYearChange = UseCityYearChange<BalanceSheet|null>({
        onchange:async(data)=>{
            try{
                if (data.munic!==null && data.year!==null){
                    const response = await serviceESF.getESFVille(data.munic.cod_geo,data.year)
                    const out = response.data as BalanceSheet
                    return out
                }else{
                    return null
                }
            }catch(err:any){
                console.log(err);
                return null
            }
        }
    })
    return handleERNCityYearChange
}