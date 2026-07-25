import type { Expense, ProfitAndLossStatement, Revenue } from '@budgets_municipaux/common';
import {ResponsiveSankey} from '@nivo/sankey'
import { populate_nodes } from '../../utils/SankeyHelpers';


interface props {
    ern: ProfitAndLossStatement|null
}

export default function SankeyERN({ ern }: props) {
    let data;
    if (ern!==null){
        const nodes=[
            {id:'0',label:'Revenus',color:'#348338'},
            {id:'1',label:'Charges',color:'#dc3030'}
        ]
        let total_revenues=0
        ern.revenues.forEach((row:Revenue)=>total_revenues+=row.value)
        let total_expenses=0
        ern.expenses.forEach((row:Expense)=> total_expenses+=row.value)
        const links=[ 
            {source:'0',target:'1',value:total_revenues}
        ]
        populate_nodes(
            ern.revenues,
            {id:'0',description:'Revenus',value:total_revenues},
            false,
            nodes,
            links
        )
        populate_nodes(
            ern.expenses,
            {id:'1',description:'Charges',value:total_expenses},
            true,
            nodes,
            links
        )
        data={
            nodes:nodes,
            links:links
        }
    }else{
        data={
            nodes:[{id:'1',label:'vide',color:'red'},{id:'2',label:'vide',color:'red'}],
            links:[{source:'1',target:'2',value:1}]
        }
    }
    return (
        <>
            <div style={{ height: 400 }}>
            <ResponsiveSankey
                data={data}
                label="label"
                colors={(node:any) => node.color} 
                linkColor="source"
            />
            </div>
        </>
    )
}