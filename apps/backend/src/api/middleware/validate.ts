import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
    (schema: z.ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {

        const result = schema.safeParse({
            params: req.params,
            query: req.query,
            body: req.body
        });

        if (!result.success) {

            console.log(result.error);
            return res.status(400).json(result.error);
        }

        req.validated = result.data as Express.Request['validated'];

        next();
    };