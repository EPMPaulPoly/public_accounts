import { FinStateSecColLev, FinStateSecColSibs, FinStateSecRowLev, FinStateSecRowSibs } from "@budgets_municipaux/common";

export function addRowSiblings(rows:FinStateSecRowLev[]){
    const inter1=addRowNextSibling(rows)
    return addRowPrevSibling(inter1) as FinStateSecRowSibs[]
}
export function addRowNextSibling(rows:FinStateSecRowLev[]){
    const sort_asc= rows.sort((a,b)=>a.item_order-b.item_order)
    const next_sib_added:any[]=sort_asc.map((m)=>{
        let next_sib=undefined
        let end_block=undefined
        for(let item of sort_asc){
            //case part way through list where you hit the next sibling
            // of equal level and you're part way through list
            // at this point you set the next sib and end block and you qui
            if(item.item_order>m.item_order&&item.level===m.level){
                next_sib=item.item_order;
                end_block=item.item_order-1;
                break
            //case part way through list where you hit the next item
            // which is of a higher level so you can't move down, the 
            // next sibling is inaccessible and the end block is you
            }else if(item.item_order>m.item_order&&item.level<m.level){
                next_sib=undefined
                end_block=item.item_order-1
                break
            //Hitting the end of the list and you're cycling through children
            // you have no next sibling. this code won't be accessed earlier in list
            // it only handles the last item
            }else if(item.item_order>m.item_order&&item.level>m.level){
                next_sib=undefined
                end_block=item.item_order
            }else if(item.item_order===m.item_order&&item.level===m.level){
                next_sib=undefined
                end_block=item.item_order
            }
        }
        return {...m,end_block:end_block,next_sib:next_sib}
    })
    return next_sib_added
}

export function addRowPrevSibling(rows:any[]){
    const sort_desc= rows.sort((a,b)=>b.item_order-a.item_order)
    const prev_sib_added:any[]=sort_desc.map((m)=>{
        let prev_sib=undefined
        for(let item of sort_desc){
            if(item.item_order<m.item_order&&item.level===m.level){
                prev_sib=item.item_order;
                break
            }else if(item.item_order<m.item_order&&item.level<m.level){
                prev_sib=undefined
                break
            }
        }
        return {...m,prev_sib:prev_sib}
    })
    const out= [...prev_sib_added].sort((a,b)=>a.item_order-b.item_order)
    return out
}

export function addColSiblings(rows:FinStateSecColLev[]){
    const inter1=addColNextSibling(rows)
    return addColPrevSibling(inter1) as FinStateSecColSibs[]
}
export function addColNextSibling(rows:FinStateSecColLev[]){
    const sort_asc= rows.sort((a,b)=>a.column_order-b.column_order)

    const next_sib_added:any[]=sort_asc.map((m)=>{
        let next_sib=undefined
        let end_block=undefined
        for(let item of sort_asc){
            if(item.column_order>m.column_order&&item.level===m.level){
                next_sib=item.column_order;
                end_block=item.column_order-1
                break
            }else if(item.column_order>m.column_order&&item.level<m.level){
                next_sib=undefined
                end_block=item.column_order-1
                break
            }else if(item.column_order>m.column_order&&item.level>m.level){
                next_sib=undefined
                end_block=item.column_order
            }else if(item.column_order===m.column_order&&item.level===m.level){
                next_sib=undefined
                end_block=item.column_order
            }
        }

        if (end_block===undefined){end_block=m.column_order}
        return {...m,end_block:end_block,next_sib:next_sib,}
    })
    return next_sib_added
}

export function addColPrevSibling(cols:any[]){
    const sort_desc= cols.sort((a,b)=>b.column_order-a.column_order)
    const prev_sib_added:any[]=sort_desc.map((m)=>{
        let prev_sib=undefined
        for(let item of sort_desc){
            if(item.column_order<m.column_order&&item.level===m.level){
                prev_sib=item.column_order;
                break
            }else if(item.column_order<m.column_order&&item.level<m.level){
                prev_sib=undefined
                break
            }
        }
        return {...m,prev_sib:prev_sib}
    })
    const out= [...prev_sib_added].sort((a,b)=>a.colunmn_order-b.colunmn_order)
    return out

}