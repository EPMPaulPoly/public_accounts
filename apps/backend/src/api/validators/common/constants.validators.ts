import z from "zod";


export const GetConstSchema = z.object({
    query: z.object({
        description:z.coerce.string().optional(),
        eq_id:z.coerce.number().int().optional(),
        const_id:z.coerce.number().int().optional(),
        limit:z.coerce.number().int().optional(),
        offset:z.coerce.number().int().optional(),
        description_like:z.string().optional(),
        symbol_like:z.string().optional(),
        use_id:z.coerce.number().int().optional()
    })
}).refine(
  ({ query }) =>
    (query.limit === undefined) === (query.offset === undefined),
  {
    message: "limit and offset must either both be defined or both be undefined",
    path: ["limit"],
  }
);;

export const NewConstSchema = z.object({
    body:z.object({
        constant_desc:z.string(),
        default_value:z.coerce.number(),
        index_year:z.coerce.number().int(),
        symbol:z.string().trim()
    })
})

export const ConstIdParamSchema=z.object({
    params:z.object({
        id:z.coerce.number().int()
    })
})

export const UpdateConstSchema = z.object({
    body: NewConstSchema.shape.body,
    params: ConstIdParamSchema.shape.params
});
