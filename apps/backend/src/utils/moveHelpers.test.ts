import { describe, it, expect } from 'vitest';
import {addRowHelperColumns} from './addHelperColumns';
import { moveRowHelper } from './moveHelpers';

describe('Check that the output is correct for subtree ends', () => {
  it('outputs the correct array for an intermediate row case', () => {
    const result = moveRowHelper(
        [
            {row_id:1,row_desc:"top1",part_id:1,parent_id:null,item_order:1,edit_flag:false,level:0},
            {row_id:2,row_desc:"mid1",part_id:1,parent_id:1,item_order:2,edit_flag:false,level:1},
            {row_id:3,row_desc:"mid2",part_id:1,parent_id:1,item_order:3,edit_flag:false,level:1},
            {row_id:4,row_desc:"bot1",part_id:1,parent_id:3,item_order:4,edit_flag:false,level:2},
            {row_id:5,row_desc:"bot2",part_id:1,parent_id:3,item_order:5,edit_flag:false,level:2},
            {row_id:6,row_desc:"mid3",part_id:1,parent_id:1,item_order:6,edit_flag:false,level:1},
            {row_id:7,row_desc:"bot3",part_id:1,parent_id:6,item_order:7,edit_flag:false,level:2},
            {row_id:8,row_desc:'top2',part_id:1,parent_id:null,item_order:8,edit_flag:false,level:0}
        ],
        1,
        'down'
    );
    console.log(result)
    expect(result).toStrictEqual([

            {row_id:8,row_desc:'top2',part_id:1,parent_id:null,item_order:1,edit_flag:false,level:0},
            {row_id:1,row_desc:"top1",part_id:1,parent_id:null,item_order:2,edit_flag:false,level:0},
            {row_id:2,row_desc:"mid1",part_id:1,parent_id:1,item_order:3,edit_flag:false,level:1},
            {row_id:3,row_desc:"mid2",part_id:1,parent_id:1,item_order:4,edit_flag:false,level:1},
            {row_id:4,row_desc:"bot1",part_id:1,parent_id:3,item_order:5,edit_flag:false,level:2},
            {row_id:5,row_desc:"bot2",part_id:1,parent_id:3,item_order:6,edit_flag:false,level:2},
            {row_id:6,row_desc:"mid3",part_id:1,parent_id:1,item_order:7,edit_flag:false,level:1},
            {row_id:7,row_desc:"bot3",part_id:1,parent_id:6,item_order:8,edit_flag:false,level:2},
        ],);
  });


});