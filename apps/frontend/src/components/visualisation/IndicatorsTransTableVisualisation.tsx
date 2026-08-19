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
    let eqWithCodes=props.equation.eq_name+' = '+ props.equation.eq_expression
    props.data[0]?.cells.forEach((c) => {
    eqWithCodes = eqWithCodes.replaceAll(
            c.eq_var_symbol,
            c.prov_rep_id??'SV'
        )
    })
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
                        key='normal-eq'
                    >
                        {props.equation.eq_name+' = '+ props.equation.eq_expression}
                    </TableCell>
                </TableRow>
                <TableRow
                    key='equation'
                >
                    <TableCell
                        colSpan={2+props.data[0].cells.length}
                        align="center"
                    >
                        {eqWithCodes}
                    </TableCell>
                </TableRow>
                <TableRow
                    key={'code-equation'}
                >
                    <TableCell
                        key='fill-code-eq'
                    >

                    </TableCell>
                    {props.data&&props.data[0]?.cells.map((c)=><TableCell align="right">{c.prov_rep_id} </TableCell>)}
                    {props.data&&props.data[0]?.consts.map((cst)=><TableCell align="right">{cst.symbol}</TableCell>)}
                </TableRow>
                <TableRow
                    key='header'
                >
                    <TableCell
                        key='city-title'
                    >
                        Ville
                    </TableCell>
                        {props.data&&props.data[0]?.cells.map((c)=><TableCell align="right">{c.eq_var_symbol} [$]</TableCell>)}
                        {props.data&&props.data[0]?.consts.map((cst)=><TableCell align="right">{cst.symbol}</TableCell>)}
                    <TableCell align="right" key='result-header'>
                        {props.capitation?'Résultat [$/pers]':'Résulat [$]'}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.data.map((city)=>
                    <TableRow
                        key={city.cod_geo}
                    >
                        <TableCell
                            key={city.cod_geo+'-city-id'}
                        >
                            {city.nom_organisme}
                        </TableCell>
                        {city.cells.map((cell)=>
                            <TableCell align="right">
                                {accounting.format(cell.value)}
                            </TableCell>)}
                        {city.consts.map((cst)=>
                            <TableCell  align="right">
                                {accounting.format(cst.default_value)}
                            </TableCell>
                        )}
                        <TableCell align="right" key={'result-'+city.cod_geo}>
                            {accounting.format(city.result)}
                        </TableCell>
                    </TableRow>)}
            </TableBody>
        </Table>)}
    </>)
}