import type { ExpenseAnalysis } from "@budgets_municipaux/common/types/accounting.js"
import { TableauComptable } from "./TableauComptable"

type props = {
    AnDep: ExpenseAnalysis|null
}

export function TableauDepense(
    { AnDep }: props
) {
    return (
        <div>
            {
                AnDep !== null ? <>{
                    <TableauComptable
                        sections={
                            [
                                { description: 'Dépenses', entrees: AnDep.expenses }
                            ]

                        }
                        montrerSousSection={false}
                    />
                }</> : <></>
            }

        </div>
    )
}