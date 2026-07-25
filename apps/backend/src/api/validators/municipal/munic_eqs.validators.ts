import { z } from 'zod';


export const GetEquationsSchema = z.object({
    query: z.object({
        eq_id: z.coerce.number().int().optional(),

    })
});

export const GetEquationVariablesSchema = z.object({
    query: z.object({
        eq_id: z.coerce.number().int().optional(),
        eq_var_id:z.coerce.number().int().optional(),
    })
});

const jurIdSchema = z.preprocess((val) => {
  if (typeof val === "string" && val.trim() !== "" && !isNaN(Number(val))) {
    return Number(val);
  }
  return val;
}, z.union([z.number(), z.string()]));

export const GetEquationResultsSchema = z.object({
    query: z.object({
        eq_id: z.coerce.number().int(),
        jur_type:z.enum(['mun','mrc','cm','reg']),
        jur_id:jurIdSchema,
        include_components:z.coerce.boolean().optional(),
        year:z.coerce.number().int().optional(),
        capitation:z.coerce.boolean().optional()
    })
});



export const PostEquationScheme=z.object({
    body:z.object({
        eq_expression:z.coerce.string(),
        eq_name:z.coerce.string()
    })
})

export const PostVariableScheme=z.object({
    body:z.object({
        eq_id:z.coerce.number().int(),
        part_id:z.coerce.number().int(),
        row_id:z.coerce.number().int(),
        col_id:z.coerce.number().int(),
        eq_var_symbol:z.coerce.string()
    })
})

export const PutEquationScheme=PostEquationScheme.extend({
    params:z.object({
        eq_id:z.coerce.number().int()
    })
})

export const PutVariableScheme=PostVariableScheme.extend({
    params:z.object({
        eq_var_id:z.coerce.number().int()
    })
})

export const DeleteEquationScheme=z.object({
    params:z.object({
        eq_id:z.coerce.number().int()
    })
})

export const DeleteVariableScheme=z.object({
    params:z.object({
        eq_var_id:z.coerce.number().int()
    })
})