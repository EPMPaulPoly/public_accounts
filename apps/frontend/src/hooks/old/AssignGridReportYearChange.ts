import type { FinStateAssignGrid } from "@budgets_municipaux/common";

import { UsePageYearChange } from "./UseReportYearChange";
import { serviceReportAssign } from "../../services/mun/serviceReportAssign";


export function UseAssignGridReportYearChange(){
    const handleAssingPageYearChange = UsePageYearChange<FinStateAssignGrid[]|null>({
        onchange:async(data)=>{
            try{
                if (data.part_id!==null && data.year!==null){
                    const response = await serviceReportAssign.getReportAssigns(data)
                    const out = response.data as FinStateAssignGrid[]
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
    return handleAssingPageYearChange
}