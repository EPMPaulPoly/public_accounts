import type { city_year_combo } from "@budgets_municipaux/common"
import { useCallback, useState } from "react"

type CityYearUpdate<T>={
    onchange:(data:city_year_combo)=>Promise<T>
}


export function UseCityYearChange<T>(
    {
        onchange
    }:CityYearUpdate<T>
){
    const [data,setData] = useState<T|null>(null);
    const handleYearCityChange = useCallback((combo:city_year_combo)=>{
        onchange(combo).then(setData).catch((err:any) => {
            console.error("useCityYearChange fetch error:", err);
        });
    },[onchange]
    )
    return {data,handleYearCityChange}
}