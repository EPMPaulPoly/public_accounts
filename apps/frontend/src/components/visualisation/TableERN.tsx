import type { city_year_combo, ProfitAndLossStatement,} from "@budgets_municipaux/common"; 
import { TableauComptable } from "./TableauComptable";
interface props{
    ern:ProfitAndLossStatement|null
    handleGetFinStat: ((of_interest:city_year_combo)=>void);
}

export default function TableERN ({
        ern,
        handleGetFinStat
    }:props
){

    return(
        <div>
            {
                ern!==null?<>{
                    <TableauComptable
                        sections={
                            [
                                {description:'Revenus',entrees:ern.revenues},
                                {description:'Dépenses',entrees:ern.expenses}
                            ]
    
                        }
                        montrerSousSection={false}
                    />
                }</>:<></>
            }
            
        </div>
    )
}