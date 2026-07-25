import { z } from 'zod';


export const ReportRowsQuerySchema = z.object({
    query: z.object({
        year: z.coerce.number().int().optional(),
        col_id:z.coerce.number().int().optional(),
        row_id:z.coerce.number().int().optional(),
        column_desc:z.coerce.string().optional(),
        prov_rep_id: z.coerce.string().optional(),
        parent_id:z.coerce.number().int().optional(),
        part_id:z.coerce.number().int().optional()
    })
});

export const ReportRowsUpsertSchema = z.object(
    {
        body: z.object({
            rows: z.array(
                z.object({
                    row_id: z.coerce.number().int().optional().nullable(),
                    row_desc: z.coerce.string(),
                    part_id: z.coerce.number().int(),
                    item_order: z.coerce.number().int(),
                    parent_id: z.coerce.number().int().nullable()
                }))
        })
    }
)


export const ReportRowsMoveSchema = z.object(
    {
        body: z.object(
            {
                move: z.object({
                    part_id: z.coerce.number().int(),
                    row_id: z.coerce.number().int(),
                    move: z.enum(['up', 'down'])
                })
            }
        )
    }
)

export const ReportNewRowSchema = z.object(
    {
        body: z.object({
                row_desc: z.coerce.string(),
                parent_id: z.coerce.number().nullable().optional(),
                part_id:z.coerce.number(),
        })
    }
)

export const ReportRowsChangeParentSchema = z.object({
    body: z.object({ 
            part_id: z.coerce.number().int(),
            row_id: z.coerce.number().int(),
            new_parent_id: z.coerce.number().int().nullable(),
            row_desc:z.coerce.string()
    })
})

export const ReportRowsDeleteRowSchema = z.object({
    params: z.object({
        row_id: z.coerce.number().int()
    })
})

export const ReportRowsChangeDescSchema = z.object({
    changedesc: z.object({
        rowid: z.coerce.number().int(),
        rowdesc: z.coerce.string()
    }).optional()
})