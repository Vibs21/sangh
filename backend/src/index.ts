import express from "express";
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const prisma = new PrismaClient();
const app = express();


app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: "Hi From Sangh!" })
})

app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        const isUserAuthentic = await bcrypt.compare(password, user?.password);
        
        if(isUserAuthentic) {
            //TODO: Send JWT token
            if(!process.env.JWT_SECRET) {
                return res.status(401).json({ message: "Invalid JWT secret" });
            } else {
                const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, { expiresIn: '800h' })
                return res.json({ message: "User authenticated successfully", token, userId: user.id });
            }
        } else {
            return res.status(401).json({message: "Invalid email or password"});
        }
    } catch (e) {
        return res.status(400).json({ message: "User not found" });
    }

})

app.post('/api/signup', async (req, res) => {

})

app.post('/api/societyOnBoarding', async (req, res) => {
    const { name, address } = req.body;
    const token = req.header("Authorization");
    try {
        const data = await prisma.society.create({
            data: {
                name,
                address
            }
        })
        res.json({ data })
    } catch (e) {
        res.status(401).send({ 'message': 'Error while onboarding society' })
    }
})

export default app;