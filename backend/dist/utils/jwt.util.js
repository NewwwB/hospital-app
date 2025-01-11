import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET || 'your_secret_key';
export function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '1d' });
}
