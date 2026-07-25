import { EquationCalcFormatted, EquationCalcPrecursor, FinStateSecValueSibs, } from "@budgets_municipaux/common";
import { groupEnd } from "node:console";

export function reformatEqPrecursorForCalc(
    result: EquationCalcPrecursor[]
): EquationCalcFormatted[] {

    const groups = new Map<string, EquationCalcFormatted>();

    for (const cell of result) {

        const key = `${cell.eq_id}:${cell.cod_geo}:${cell.year}`;

        let group = groups.get(key);

        if (!group) {

            group = {
                eq_id: cell.eq_id,
                eq_name: cell.eq_name,
                eq_expression: cell.eq_expression,
                cod_geo: cell.cod_geo,
                nom_organisme:cell.nom_organisme,
                year: cell.year,
                population:cell.population,
                cells: [],
                scope: {}
            };

            groups.set(key, group);
        }

        group.cells.push({
            eq_var_id: cell.eq_var_id,
            eq_id: cell.eq_id,
            eq_var_symbol: cell.eq_var_symbol,
            part_id: cell.part_id,
            row_id: cell.row_id,
            col_id: cell.col_id,
            cod_geo: cell.cod_geo,
            year: cell.year,
            value: cell.value
        });

        group.scope[cell.eq_var_symbol] = cell.value;
        group.scope['population'] = cell.population;
    }

    return [...groups.values()];
}