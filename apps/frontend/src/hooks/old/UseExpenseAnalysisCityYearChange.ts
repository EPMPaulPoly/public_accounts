import { UseCityYearChange } from "./UseCityYearChange";
import { serviceAnDep } from "../../services/mun/serviceDepenses";
import type { ExpenseAnalysis } from "@budgets_municipaux/common/types/accounting.js";


export function UseExpenseAnalysisCityYearChange(){
    const handleExpAnCityYearChange = UseCityYearChange<ExpenseAnalysis|null>({
        onchange:async(data)=>{
            try{
                if (data.munic!==null && data.year!==null){
                    const response = await serviceAnDep.getExpAnCity(data.munic.cod_geo,data.year)
                    const out = response.data as ExpenseAnalysis
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
    return handleExpAnCityYearChange
}