import { z } from 'zod';

export const municipalityIdSchema = z.object({
    query: z.object({
        year:z.coerce.number().int().optional(),
        cod_geo:z.coerce.number().int().optional(),
        region_type:z.enum(['mrc','reg','cm']).optional,
        region_id:z.coerce.string(),
        pop_gt:z.coerce.number().int().optional(),
        pop_st:z.coerce.number().int().optional(),
        limit:z.coerce.number().int().optional(),
        offset:z.coerce.number().int().optional()
    })
});