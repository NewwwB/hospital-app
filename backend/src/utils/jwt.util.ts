import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export function generateToken(payload: any) {
    return jwt.sign(payload, secretKey, { expiresIn: '1d' });
}
