import type { EquationCalcResult, EquationDef } from "@budgets_municipaux/common";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
interface ITTVProps{
    equation:EquationDef
    data:EquationCalcResult[],
    capitation:boolean
}

export default function IndicatorsTransTableVisualisation(props:ITTVProps){

    const accounting = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        currencySign: 'accounting',
        maximumFractionDigits: 0,
    });

    return (<>
        {props.data&&props.data.length>0&&(
        <Table
            stickyHeader
            size="small"
        >
            <TableHead>
                <TableRow
                    
                >
                    <TableCell
                        colSpan={2+props.data[0].cells.length}
                        align="center"
                    >
                        {props.equation.eq_name+' = '+ props.equation.eq_expression}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Ville
                    </TableCell>
                        {props.data&&props.data[0]?.cells.map((c)=><TableCell align="right">{c.eq_var_symbol} [$]</TableCell>)}
                    <TableCell align="right">
                        {props.capitation?'Résultat [$/pers]':'Résulat [$]'}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.data.map((city)=>
                    <TableRow>
                        <TableCell>
                            {city.nom_organisme}
                        </TableCell>
                        {city.cells.map((cell)=>
                            <TableCell align="right">
                                {accounting.format(cell.value)}
                            </TableCell>)}
                        <TableCell align="right">
                            {accounting.format(city.result)}
                        </TableCell>
                    </TableRow>)}
            </TableBody>
        </Table>)}
    </>)
}