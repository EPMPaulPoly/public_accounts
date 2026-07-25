import { Request, Response, NextFunction } from 'express'
import { auth } from '../../utils/auth'
import { fromNodeHeaders } from 'better-auth/node'

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })

    if (!session?.user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    // Attach user to request for downstream use
    (req as any).user = session.user
    next()
}

export function requireRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user

        if (user.role !== role) {
            return res.status(403).json({ error: 'Forbidden' })
        }

        next()
    }
}