var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js'; // Prisma Client
import dotenv from 'dotenv';
dotenv.config();
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, role } = req.body;
            try {
                if (!email || !password || !role) {
                    res.status(400).send({ error: 'Email and password is required' });
                    return;
                }
                // Hash the password
                const hashedPassword = yield bcrypt.hash(password, 10);
                // Create user in the database
                const user = yield prisma.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        role,
                    },
                });
                // Return a success response
                res.status(201).json({ message: 'User registered successfully!', user });
            }
            catch (err) {
                res.status(500).json({ message: 'Something went wrong:' + err });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                // Find user by email
                const user = yield prisma.user.findUnique({ where: { email } });
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                // Compare the provided password with the stored hash
                const isMatch = yield bcrypt.compare(password, user.password);
                if (!isMatch) {
                    res.status(401).json({ message: 'Invalid credentials' });
                    return;
                }
                const secretKey = process.env.JWT_SECRET; // Ensure this is defined
                if (!secretKey) {
                    res.status(500).json({ message: 'Secret key not defined in environment variables' });
                    return;
                }
                // Generate JWT token
                const token = jwt.sign({ userId: user.id, role: user.role }, // Payload (store user id and role in token)
                secretKey, // Secret key (should be in .env)
                { expiresIn: '1h' } // Token expiry time
                );
                // Return the token
                res.json({ token, role: user.role });
            }
            catch (err) {
                res.status(500).json({ message: 'Something went wrong: ' + err });
            }
        });
    }
}
export default new AuthController();
