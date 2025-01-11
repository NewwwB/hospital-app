// @ts-ignore
import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET || 'your_secret_key';
export function authenticate(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
}
