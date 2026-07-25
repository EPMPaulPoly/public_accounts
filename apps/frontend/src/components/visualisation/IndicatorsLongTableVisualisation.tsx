import type { EquationCalcResult, EquationDef } from "@budgets_municipaux/common";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
interface ILTVProps{
    equation:EquationDef
    data:EquationCalcResult[],
    capitation:boolean
}

interface cell{
    cod_geo:number,
    nom_organisme:string,
    result:number
}

interface Result{
    year:number,
    cells:cell[]
}

export default function IndicatorsLongTableVisualisation(props:ILTVProps){

    const accounting = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        currencySign: 'accounting',
        maximumFractionDigits: 0,
    });
    const allMuns = [...new Set(props.data.map(l => l.cod_geo))];
    const groups = new Map<string, Result>();

    for (const line of props.data) {

        const key = `${line.year}`;

        let group = groups.get(key);

        if (!group) {

            group = {
                year: line.year,
                cells: []
            };

            groups.set(key, group);
        }

        group.cells.push({
            cod_geo:line.cod_geo,
            nom_organisme:line.nom_organisme,
            result:line.result
        });
    }
    const groupsDisp=[...groups.values()].sort((a,b)=>a.year-b.year)
    return (<>
        {groupsDisp&&groupsDisp.length>0&&(
        <Table
            stickyHeader
            size="small"
        >
            <TableHead>
                <TableRow
                    
                >
                    <TableCell
                        colSpan={1+Math.max(...groupsDisp.map((y)=>y.cells.length))}
                        align="center"
                    >
                        {props.capitation?
                        props.equation.eq_name+' = ('+ props.equation.eq_expression+')/pop'
                        :props.equation.eq_name+' = '+ props.equation.eq_expression}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Année
                    </TableCell>
                    {allMuns&&allMuns.map((r)=><TableCell align="right">{groupsDisp[0].cells.find((c)=>c.cod_geo===r)?.nom_organisme??r}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {groupsDisp.map((year)=>
                    <TableRow>
                        <TableCell>
                            {year.year}
                        </TableCell>
                        {allMuns.map((mun)=>
                            <TableCell align="right">
                                {accounting.format(year.cells.find((c)=>c.cod_geo===mun)?.result??0)}
                            </TableCell>)}
                    </TableRow>)}
            </TableBody>
        </Table>)}
    </>)
}