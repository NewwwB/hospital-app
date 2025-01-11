import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authenticate(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });  // Send Unauthorized response
        return;  // End execution here, no need to call next()
    }

    try {
        const secretKey = process.env.JWT_SECRET;

        if (!secretKey) {
            res.status(500).json({ message: 'JWT_SECRET is not defined in environment' });
            return;  // End execution here
        }

        // Decode token and attach user information to the request object
        const decoded = jwt.verify(token, secretKey) as { role: string; id: string };
        (req as any).user = decoded;

        next();  // Token is valid, pass control to next middleware/route
    } catch (err) {
        res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
        return;  // End execution here
    }
}

export const authorizeRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if ((req as any).user?.role !== role) {
            res.status(403).json({ message: 'Forbidden: Access is denied due to insufficient permissions' });
            return;  // End execution here
        }
        next();  // User is authorized, pass control to next middleware/route
    };
};
