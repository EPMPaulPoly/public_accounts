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
        // TO-DO: Create unit test checking that this is desired behaviour and move this comment block there
        // if the role is different fom role or different from admin, throw an 403 code
        // | role      | user.role | A user.role!==admin| B  user.role!==role | A&&B | throw 403| case
        // | admin     |    admin  |       false        |      false          | false| false    | needs admin, has admin
        // | user      |    admin  |       false        |      true           | false| false    | needs user, has admin
        // | user      |     user  |       true         |      false          | false| false    | needs user, has user
        // | admin     |     user  |       true         |      true           | true | true     | needs admin, has user
        // | user      | undefined |       true         |      true           | true | true     | needs user, has nothing
        // | admin     | undefined |       true         |      true           | true | true     | needs admin, has nothing 

        if (user.role !== role && user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' })
        }

        next()
    }
}