import type { 
    AccumulatedDeficit, 
    Expense, 
    FinancialAsset, 
    FinancialLiability, 
    NonFinancialAsset, 
    Revenue 
} from "@budgets_municipaux/common"
import { Table, TableCell, TableHead, TableRow , TableBody} from "@mui/material"
import { useCityYear } from "../../context/contextProvider"

type section={
    description:string, 
    entrees: entree[]
}
type entree=(Revenue|Expense|FinancialAsset|FinancialLiability|NonFinancialAsset|AccumulatedDeficit|null)


interface entreeTableauComptable{
    sections:section[],
    montrerSousSection:boolean
}

function ReturnSectionHeader(section:section){
    return (
        <>
            <TableRow>
                <TableCell

                colSpan={4}
                align='left'
                >
                    <b>{section.description}</b>
                </TableCell>
            </TableRow>
        </>
    )
}
type ReturnEntryRowProps = {
    entree: entree;
    montrerSousSections: boolean;
    depth:number
};

function ReturnEntryRow({
    entree,
    montrerSousSections,
    depth
}: ReturnEntryRowProps) {
    return (
        <>
        {entree!==null?<><TableRow>
                <TableCell
                sx={{ pl: depth * 2 }}
                >
                    {entree.description}
                </TableCell>
                <TableCell />
                <TableCell>{entree.value}</TableCell>
                <TableCell />
            </TableRow>

            {montrerSousSections &&
                entree.components?.map((entreeSub) => (
                    <ReturnEntryRow
                        key={entreeSub.id}
                        entree={entreeSub}
                        montrerSousSections={montrerSousSections}
                        depth={depth+1}
                    />
                ))}
        
        </>:<></>}
            
        </>
    );
}

export function TableauComptable(
    {sections,montrerSousSection}:entreeTableauComptable
){
    const {year}= useCityYear()
    return (
        <>
        {year!==null && sections.every((element)=>element!==null)?
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Poste
                        </TableCell>
                        <TableCell>
                            Budget {year}
                        </TableCell>
                        <TableCell>
                            Réalisations {year}
                        </TableCell>
                        <TableCell>
                            Réalisations {year-1}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sections.map((section)=>{
                        return (
                            <>
                                {ReturnSectionHeader(section)}
                                {section.entrees.map((entree)=><ReturnEntryRow
                                    entree={entree}
                                    montrerSousSections={montrerSousSection}
                                    depth={2}
                                />)}
                            </>
                        )}
                    )}
                </TableBody>
            </Table>
        </>:<>
        </>}</>
    )
}