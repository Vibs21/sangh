import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.post('/community/onBoarding', auth, async (req, res) => {
    const { name, address } = req.body;
    
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

export default router;