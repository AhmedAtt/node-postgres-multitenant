import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface DecodedToken {
  userId: string
  tenantId: string
}

declare global {
  namespace Express {
    interface Request {
      tenantId?: string
    }
  }
}

export const tenantMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken
      req.tenantId = decoded.tenantId
      next()
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' })
    }
  } else {
    res.status(401).json({ message: 'Authorization header missing' })
  }
}
