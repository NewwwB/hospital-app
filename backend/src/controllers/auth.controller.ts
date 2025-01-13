import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js'; // Prisma Client
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

class AuthController {
    async register(req: Request, res: Response) {
        const { email, password, role } = req.body;


        try {
            if(!email || !password || !role) {
                res.status(400).send({error: 'Email and password is required'});
                return;
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);


            // Create user in the database
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role,
                },
            });

            // Return a success response
            res.status(201).json({ message: 'User registered successfully!', user });
        } catch (err) {
            res.status(500).json({ message: 'Something went wrong:'+ err });
        }
    }

    async login(req: Request, res: Response):Promise<void> {
        const { email, password } = req.body;

        try {
            // Find user by email
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            // Compare the provided password with the stored hash
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch){
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const secretKey = process.env.JWT_SECRET; // Ensure this is defined

            if (!secretKey) {
                res.status(500).json({ message: 'Secret key not defined in environment variables' });
                return;
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, role: user.role }, // Payload (store user id and role in token)
                secretKey, // Secret key (should be in .env)
                { expiresIn: '1h' } // Token expiry time
            );

            // Return the token
            res.json({ token, role: user.role });
        } catch (err) {
            res.status(500).json({ message: 'Something went wrong: ' + err });
        }
    }
}


export default new AuthController();