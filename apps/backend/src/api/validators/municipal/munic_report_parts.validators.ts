import { z } from 'zod';


export const ReportPartQuerySchema = z.object({
    query: z.object({
        year: z.coerce.number().int().optional(),
        col_id: z.coerce.number().int().optional(),
        row_id: z.coerce.number().int().optional(),
        column_desc: z.coerce.string().optional(),
        prov_rep_id: z.coerce.string().optional(),
        part_id:z.coerce.string().optional()
    })
});

export const ReportPartCreateSchema = z.object({
    body: z.object({
        part_page_def: z.coerce.string(),
        part_desc:z.coerce.string()
    })
});

export const ReportPartDeleteSchema = z.object({
    params: z.object({
        part_id: z.coerce.number().int(),
    })
});

export const ReportPartModifySchema = z.object({
    params: z.object({
        part_id: z.coerce.number().int()
    }),
    body: z.object({
        part_page_def:z.coerce.string(),
        part_desc:z.coerce.string()
    })
})