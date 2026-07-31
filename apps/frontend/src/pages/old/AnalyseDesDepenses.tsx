import ChoixVilleAnnee from "../../components/selectors/ChoixVilleAnnee";
import MenuBar from "../../components/common/MenuBar";
import { TableauDepense } from "../../components/visualisation/TableauDepenses";
import { useAppContext } from "../../context/contextProvider";
import { UseExpenseAnalysisCityYearChange } from "../../hooks/old/UseExpenseAnalysisCityYearChange";
import { useEffect } from "react";

export function AnalyseDesDepenses(){
    const {municipality,year,setMunicipality,setYear}=useAppContext()
    const {data,handleYearCityChange} = UseExpenseAnalysisCityYearChange()  
        // Get dfata if city year are known
        useEffect(()=>{
            const fetchData=()=>{
                if (municipality!==null && year!==null){
                    handleYearCityChange({munic:municipality,year:year})
                }
            }
            fetchData()
        }
        ,[])
    return (
        <>
            <MenuBar/>
            <div>
                <ChoixVilleAnnee
                    defAnnee={setYear}
                    annee={year}
                    ville={municipality}
                    defVille={setMunicipality}
                    handleGetFinStat={handleYearCityChange}
                />
            </div>
            <TableauDepense
                AnDep={data}
            />
        </>

    )
}