import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const router = Router();
const prisma = new PrismaClient();


router.post('/user/signin', async (req, res) => {
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

export default router;