import { describe, it, expect } from 'vitest';
import {addColHelperColumns, addRowHelperColumns} from './addHelperColumns';
import { addRowLevelEditFlagFields } from './addLevelEditFlagFields';

describe('Check that the output is correct for adding helper data', () => {
  it('outputs the correct array for a standard case', () => {
    const result = addRowHelperColumns(
        [
            {row_id:1,row_desc:"top1",part_id:1,parent_id:null,item_order:1},
            {row_id:2,row_desc:"mid1",part_id:1,parent_id:1,item_order:2},
            {row_id:3,row_desc:"mid2",part_id:1,parent_id:1,item_order:3},
            {row_id:4,row_desc:"bot1",part_id:1,parent_id:3,item_order:4},
            {row_id:5,row_desc:"bot1",part_id:1,parent_id:3,item_order:5},
            {row_id:6,row_desc:"bot2",part_id:1,parent_id:3,item_order:6},
            {row_id:7,row_desc:"mid3",part_id:1,parent_id:1,item_order:7},
            {row_id:8,row_desc:"bot3",part_id:1,parent_id:7,item_order:8},
            {row_id:9,row_desc:'top2',part_id:1,parent_id:null,item_order:9}
        ]
    );
    expect(result).toStrictEqual([
            {row_id:1,row_desc:"top1",part_id:1,parent_id:null,item_order:1,edit_flag:false,level:0,end_block:8,next_sib:9,prev_sib:undefined,can_move_up:false,can_move_down:true},
            {row_id:2,row_desc:"mid1",part_id:1,parent_id:1,item_order:2,edit_flag:false,level:1,end_block:2,next_sib:3,prev_sib:undefined,can_move_up:false,can_move_down:true},
            {row_id:3,row_desc:"mid2",part_id:1,parent_id:1,item_order:3,edit_flag:false,level:1,end_block:6,next_sib:7,prev_sib:2,can_move_up:true,can_move_down:true},
            {row_id:4,row_desc:"bot1",part_id:1,parent_id:3,item_order:4,edit_flag:false,level:2,end_block:4,next_sib:5,prev_sib:undefined,can_move_up:false,can_move_down:true},
            {row_id:5,row_desc:"bot1",part_id:1,parent_id:3,item_order:5,edit_flag:false,level:2,end_block:5,next_sib:6,prev_sib:4,can_move_up:true,can_move_down:true},
            {row_id:6,row_desc:"bot2",part_id:1,parent_id:3,item_order:6,edit_flag:false,level:2,end_block:6,next_sib:undefined,prev_sib:5,can_move_up:true,can_move_down:false},
            {row_id:7,row_desc:"mid3",part_id:1,parent_id:1,item_order:7,edit_flag:false,level:1,end_block:8,next_sib:undefined,prev_sib:3,can_move_up:true,can_move_down:false},
            {row_id:8,row_desc:"bot3",part_id:1,parent_id:7,item_order:8,edit_flag:false,level:2,end_block:8,next_sib:undefined,prev_sib:undefined,can_move_up:false,can_move_down:false},
            {row_id:9,row_desc:'top2',part_id:1,parent_id:null,item_order:9,edit_flag:false,level:0,end_block:9,next_sib:undefined,prev_sib:1,can_move_up:true,can_move_down:false}
        ]);
  });

  it('handles empty arrays', () => {
    expect(addRowLevelEditFlagFields([])).toStrictEqual([]);
  });

  const result = addColHelperColumns(
        [
            {col_id:1,column_desc:"top1",part_id:1,column_order:1},
            {col_id:2,column_desc:"mid1",part_id:1,column_order:2},
            {col_id:3,column_desc:"mid2",part_id:1,column_order:3},
            {col_id:4,column_desc:"bot1",part_id:1,column_order:4},
            {col_id:5,column_desc:"bot2",part_id:1,column_order:5},
            {col_id:6,column_desc:"mid3",part_id:1,column_order:6},
            {col_id:7,column_desc:"bot3",part_id:1,column_order:7},
            {col_id:8,column_desc:'top2',part_id:1,column_order:8}
        ]
    );
    expect(result).toStrictEqual([
            {col_id:1,column_desc:"top1",part_id:1,column_order:1,edit_flag:false,level:0,end_block:1,next_sib:2,prev_sib:undefined,can_move_left:false,can_move_right:true},
            {col_id:2,column_desc:"mid1",part_id:1,column_order:2,edit_flag:false,level:0,end_block:2,next_sib:3,prev_sib:1,can_move_left:true,can_move_right:true},
            {col_id:3,column_desc:"mid2",part_id:1,column_order:3,edit_flag:false,level:0,end_block:3,next_sib:4,prev_sib:2,can_move_left:true,can_move_right:true},
            {col_id:4,column_desc:"bot1",part_id:1,column_order:4,edit_flag:false,level:0,end_block:4,next_sib:5,prev_sib:3,can_move_left:true,can_move_right:true},
            {col_id:5,column_desc:"bot2",part_id:1,column_order:5,edit_flag:false,level:0,end_block:5,next_sib:6,prev_sib:4,can_move_left:true,can_move_right:true},
            {col_id:6,column_desc:"mid3",part_id:1,column_order:6,edit_flag:false,level:0,end_block:6,next_sib:7,prev_sib:5,can_move_left:true,can_move_right:true},
            {col_id:7,column_desc:"bot3",part_id:1,column_order:7,edit_flag:false,level:0,end_block:7,next_sib:8,prev_sib:6,can_move_left:true,can_move_right:true},
            {col_id:8,column_desc:'top2',part_id:1,column_order:8,edit_flag:false,level:0,end_block:8,next_sib:undefined,prev_sib:7,can_move_left:true,can_move_right:false}
        ]);
  });

  it('handles empty arrays', () => {
    expect(addRowLevelEditFlagFields([])).toStrictEqual([]);
  });