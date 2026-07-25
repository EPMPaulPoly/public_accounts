import { z } from 'zod';


export const DataProvIdQuerySchema = z.object({
    query: z.object({
        year: z.coerce.number().int(),
        limit:z.coerce.number().int().optional(),
        offset:z.coerce.number().int().optional(),
        search_string:z.coerce.string().optional()
    })
});

export const GetDataGridScheme=z.object({

    query:z.object({
        part_id:z.coerce.number().int(),
        year:z.coerce.number().int(),
        cod_geo:z.coerce.number().int()
    })
})