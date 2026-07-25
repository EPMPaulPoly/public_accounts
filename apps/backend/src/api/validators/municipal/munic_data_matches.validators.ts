import { z } from 'zod';


export const MatchesQuerySchema = z.object({
    query: z.object({
        year: z.coerce.number().int().optional(),
        col_id: z.coerce.number().int().optional(),
        row_id: z.coerce.number().int().optional(),
        part_id:z.coerce.number().int().optional(),
        prov_rep_id: z.coerce.string().optional(),
    })
});

export const MatchesGridQuerySchema = z.object({
    query: z.object({
        year: z.coerce.number().int(),
        part_id:z.coerce.number().int(),
    })
});

export const MatchesCreateQueryScheme=z.object({
    body:z.object({
        row_id:z.coerce.number().int(),
        col_id:z.coerce.number().int(),
        year:z.coerce.number().int(),
        part_id:z.coerce.number().int(),
        prov_rep_id:z.coerce.string()
    })
})

export const MatchesUpdateQueryScheme=z.object({
    body:z.object({
        match_id:z.coerce.number().int(),
        row_id:z.coerce.number().int(),
        col_id:z.coerce.number().int(),
        year:z.coerce.number().int(),
        part_id:z.coerce.number().int(),
        prov_rep_id:z.coerce.string()
    })
})

export const MatchesDeleteQueryScheme=z.object({
    params:z.object({
        match_id:z.coerce.number().int()
    })
})
export const MatchesDeleteGridQueryScheme=z.object({
    params:z.object({
        match_id:z.coerce.number().int(),
    }),
    query:z.object({
        part_id:z.coerce.number().int(),
        year:z.coerce.number().int()
    })
})


export const MatchesCopyBetweenYearQuerySchema=z.object({
    query:z.object({
        year_to_copy:z.coerce.number().int(),
        year_to_seed:z.coerce.number().int()
    })
})