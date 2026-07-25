import type { pageYearCombo } from "@budgets_municipaux/common"
import { useCallback, useState } from "react"

type ReportYearUpdate<T>={
    onchange:(data:pageYearCombo)=>Promise<T>
}


export function UsePageYearChange<T>(
    {
        onchange
    }:ReportYearUpdate<T>
){
    const [data,setData] = useState<T|null>(null);
    const handlePageYearChange = useCallback((combo:pageYearCombo)=>{
        onchange(combo).then(setData).catch((err:any) => {
            console.error("useCityYearChange fetch error:", err);
        });
    },[onchange]
    )
    return {data,handlePageYearChange}
}