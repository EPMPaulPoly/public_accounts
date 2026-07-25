import { useState, useEffect } from "react"
import ChoixVueERN from "../../components/selectors/ChoixVueERN"
import MenuBar from "../../components/common/MenuBar"
import TableERN from "../../components/visualisation/TableERN"
import SankeyERN from "../../components/visualisation/SankeyERN"
import { UseERNCityYearChange } from "../../hooks/old/UseERNCityYearChange"
import ChoixVilleAnnee from "../../components/selectors/ChoixVilleAnnee"
import { useCityYear } from "../../context/contextProvider"
import type { year } from "@budgets_municipaux/common"
import { serviceMunicEnt } from "../../services/mun/serviceMunicEntites"
function EtatResultatNet() {
    const {
        municipality,
        year,
        setMunicipality,
        setYear,
    } = useCityYear();
    const [vue,defVue] = useState<'tab'|'sankey'|'bar'>('tab')

    const [yearOptions,setYearOptions]= useState<year[]>([])
    const {data,handleYearCityChange} = UseERNCityYearChange()  
    // Get dfata if city year are known
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
    return (
        <>
            <MenuBar />
            <div>
            <ChoixVueERN 
                vue={vue}
                defVue={defVue}
            />
            <ChoixVilleAnnee
                ville={municipality}
                defVille={setMunicipality}
                annee={year}
                defAnnee={setYear}
                handleGetFinStat={handleYearCityChange}
                yearOptions={yearOptions}
                setYearOptions={setYearOptions}
            />
            </div>
            {vue==='tab'?<><TableERN
                ern={data}
                handleGetFinStat={handleYearCityChange}
            /></>:vue==='sankey'?<>
            <SankeyERN
                ern={data}
            />
            </>:<>
            </>}
            
        </>
    )
}

export default EtatResultatNet