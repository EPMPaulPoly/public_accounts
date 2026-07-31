import ChoixVilleAnnee from "../../components/selectors/ChoixVilleAnnee";
import MenuBar from "../../components/common/MenuBar";
import { useAppContext } from "../../context/contextProvider";
import { UseESFCityYearChange } from "../../hooks/old/UseESFCityYearChange";
import TableESF from "../../components/visualisation/TableESF";
import { useEffect, useState } from "react";
import type { year } from "@budgets_municipaux/common";
import { serviceMunicEnt } from "../../services/mun/serviceMunicEntites";

function EtatSituationFinanciere(){
    const {municipality,year,setMunicipality,setYear}=useAppContext()
    const [yearOptions,setYearOptions]= useState<year[]>([])
    const {data,handleYearCityChange} = UseESFCityYearChange()
    // Get data is city year are known
    useEffect(()=>{
        const fetchData=async()=>{
            const yearOptions = await serviceMunicEnt.getYears()
                        if (yearOptions.data){
                            console.log('received year',yearOptions.data)
                            setYearOptions([...yearOptions.data])
                            const years_fin = yearOptions.data?.map((row) => row.year) ?? [];
                            const years_max = Math.max(...years_fin, 0);
                            setYear(years_max)
                        }
            if (municipality!==null && year!==null){
                handleYearCityChange({munic:municipality,year:year})
            }
        }
        fetchData()
    }
    ,[])
    return(
        <>
            <MenuBar/>
            <ChoixVilleAnnee
                ville={municipality}
                annee={year}
                defVille={setMunicipality}
                defAnnee={setYear}
                handleGetFinStat={handleYearCityChange}
                yearOptions={yearOptions}
                setYearOptions={setYearOptions}
            />
            {data!==null?<>
                    <TableESF
                        esf={data}
                    />
                </>:<>  
                
                </>}
        </>
    )
}


export default EtatSituationFinanciere