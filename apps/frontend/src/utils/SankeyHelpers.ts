import type { Revenue ,Expense,node,link  } from "@budgets_municipaux/common"

export function populate_nodes(
    data:Revenue[]|Expense[],
    parent:Revenue|Expense,
    parent_start:boolean,
    nodes:node[],
    links:link[]
):void{    
    for (var entry of data){
        if (entry.components){
            populate_nodes(entry.components,entry,parent_start,nodes,links)
        }
        let color= '#348338'
        if (parent_start===true){
            color='#dc3030'
        }
        nodes.push({id:entry.id,label:entry.description,color:color})
        if (parent_start=== true){
            links.push({source:parent.id,target:entry.id,value:entry.value})
        }else{
            links.push({source:entry.id,target:parent.id,value:entry.value})
        }
    }
}