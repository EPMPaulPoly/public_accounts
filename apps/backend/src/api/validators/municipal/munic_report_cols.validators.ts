import { z } from 'zod';


export const ReportColsQuerySchema = z.object({
    query: z.object({
        year: z.coerce.number().int().optional(),
        col_id: z.coerce.number().int().optional(),
        row_id: z.coerce.number().int().optional(),
        column_desc: z.coerce.string().optional(),
        prov_rep_id: z.coerce.string().optional(),
        part_id:z.coerce.number().int()
    })
});

export const ReportColsUpsertSchema = z.object(
    {
        body: z.object({
            cols: z.array(
                z.object({
                    col_id: z.coerce.number().int().optional().nullable(),
                    column_desc: z.coerce.string(),
                    part_id: z.coerce.number().int(),
                    column_order: z.coerce.number().int(),
                }))
        })
    }
)


export const ReportColsMoveSchema = z.object(
    {
        body: z.object(
            {
                move: z.object({
                    part_id: z.coerce.number().int(),
                    col_id: z.coerce.number().int(),
                    move: z.enum(['left', 'right'])
                })

            }
        )
    }
)

export const ReportNewColSchema = z.object(
    {
        body: z.object({
                column_desc: z.coerce.string(),
                part_id:z.coerce.number().int()
        })
    }
)

export const ReportDeleteColSchema = z.object({
    params: z.object({
        col_id: z.coerce.number().int()
    })
})

export const ReportColsChangeDescSchema = z.object({
    changedesc: z.object({
        rowid: z.coerce.number().int(),
        rowdesc: z.coerce.string()
    }).optional()
})