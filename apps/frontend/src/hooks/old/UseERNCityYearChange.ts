import type { ProfitAndLossStatement } from "@budgets_municipaux/common";
import { UseCityYearChange } from "./UseCityYearChange";
import { serviceERN } from "../../services/mun/serviceERN";


export function UseERNCityYearChange(){
    const handleERNCityYearChange = UseCityYearChange<ProfitAndLossStatement|null>({
        onchange:async(data)=>{
            try{
                if (data.munic!==null && data.year!==null){
                    const response = await serviceERN.getERNVille(data.munic.cod_geo,data.year,true)
                    const out = response.data as ProfitAndLossStatement
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