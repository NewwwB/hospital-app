import jwt from 'jsonwebtoken';
export function authenticate(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' }); // Send Unauthorized response
        return; // End execution here, no need to call next()
    }
    try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            res.status(500).json({ message: 'JWT_SECRET is not defined in environment' });
            return; // End execution here
        }
        // Decode token and attach user information to the request object
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next(); // Token is valid, pass control to next middleware/route
    }
    catch (err) {
        res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
        return; // End execution here
    }
}
export const authorizeRole = (role) => {
    return (req, res, next) => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== role) {
            res.status(403).json({ message: 'Forbidden: Access is denied due to insufficient permissions' });
            return; // End execution here
        }
        next(); // User is authorized, pass control to next middleware/route
    };
};
