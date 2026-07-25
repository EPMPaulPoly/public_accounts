import type {
    BalanceSheet,
} from "@budgets_municipaux/common";
import { TableauComptable } from "./TableauComptable";

interface props {
    esf: BalanceSheet | null,
}

export default function TableESF({
    esf,
}: props
) {
    
    return (
        <div>
            {
                esf !== null ? <>{
                    <TableauComptable
                        sections={
                            [
                                { description: 'Actifs Financiers', entrees: esf.fin_assets },
                                { description: 'Passifs Financiers', entrees: esf.fin_liab },
                                { description: 'Actifs physiques', entrees: esf.non_fin_assets },
                                { description: 'Déficit cumulé', entrees: esf.acc_defic }
                            ]
                        }
                        montrerSousSection={false}
                    />
                }</> : <></>
            }


        </div>
    )
}