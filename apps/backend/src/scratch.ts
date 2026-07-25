import { addColHelperColumns, addRowHelperColumns } from "./utils";
import { moveColHelper, moveRowHelper } from "./utils/moveHelpers";
import { newColHelper } from "./utils/newItemHelper";
/*
const rows =  [
            {row_id:1,row_desc:"1",part_id:1,parent_id:null,item_order:1},
            {row_id:2,row_desc:"1/2",part_id:1,parent_id:1,item_order:2},
            {row_id:3,row_desc:"1/3",part_id:1,parent_id:1,item_order:3},
            {row_id:4,row_desc:"1/3/4",part_id:1,parent_id:3,item_order:4},
            {row_id:5,row_desc:"1/3/5",part_id:1,parent_id:3,item_order:5},
            {row_id:6,row_desc:"1/3/6",part_id:1,parent_id:3,item_order:6},
            {row_id:7,row_desc:"1/7",part_id:1,parent_id:1,item_order:7},
            {row_id:8,row_desc:"1/7/8",part_id:1,parent_id:7,item_order:8},
            {row_id:9,row_desc:'9',part_id:1,parent_id:null,item_order:9},
            {row_id:10,row_desc:'10',part_id:1,parent_id:null,item_order:10}
        ]
const out=addRowHelperColumns(rows)
console.table(out)
const move=moveRowHelper(out,3,'up')
console.table(move)
const move2=moveRowHelper(out,2,'down')
console.table(move2)
console.log('done')
*/
const cols =  [
            {col_id:1,column_desc:"1",part_id:1,column_order:1},
            {col_id:2,column_desc:"2",part_id:1,column_order:2},
            {col_id:3,column_desc:"3",part_id:1,column_order:3},
            {col_id:4,column_desc:"4",part_id:1,column_order:4},
            {col_id:5,column_desc:"5",part_id:1,column_order:5},
            {col_id:6,column_desc:"6",part_id:1,column_order:6},
            {col_id:7,column_desc:"7",part_id:1,column_order:7},
            {col_id:8,column_desc:"8",part_id:1,column_order:8},
            {col_id:9,column_desc:'9',part_id:1,column_order:9},
            {col_id:10,column_desc:'10',part_id:1,column_order:10}
        ]
const newCol=[{col_id:-1,column_desc:'new',part_id:1,column_order:-1}]
const out2=addColHelperColumns(cols)
const out3=addColHelperColumns(newCol)
//console.table(out2)
//const move3=moveColHelper(out2,3,'left')
//console.table(move3)
//const move4=moveColHelper(out2,7,'right')
//console.table(move4)
const add5=newColHelper(cols,newCol)
console.table(add5)
console.log('done')