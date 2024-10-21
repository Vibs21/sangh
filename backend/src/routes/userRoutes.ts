import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth, User } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

declare global {
    interface Error {
        statusCode?: number;
    }
}

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isUserAuthentic = await bcrypt.compare(password, user?.password);

        if (isUserAuthentic) {
            if (!process.env.JWT_SECRET) {
                return res.status(401).json({ message: 'Invalid JWT secret' });
            } else {
                const token = jwt.sign(
                    { userId: user.id, communityId: user.societyId },
                    process.env.JWT_SECRET,
                    { expiresIn: '800h' }
                );
                return res.json({ message: 'User authenticated successfully', token });
            }
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (e) {
        return res.status(400).json({ message: 'User not found' });
    }
});

router.post('/signup', async (req, res, next) => {
    const { email, password, phoneNumber, societyId, firstName, lastName } =
        req.body;

    const hashedPwd = bcrypt.hashSync(password.toString(), 10);

    if (societyId == 0) {
        return res.status(401).json({ message: "Society ID can't be 0" });
    }

    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPwd,
                phoneNumber: phoneNumber.toString(),
                societyId,
                firstName,
                lastName,
            },
            select: {
                id: true,
                email: true,
                phoneNumber: true,
                societyId: true,
                firstName: true,
            },
        });

        res.send({ user });
    } catch (e: any) {
        console.error('Error details:', e); // Log the actual error details
        const err = new Error('Invalid credentials');
        err.statusCode = 401; // Set status code
        err.message = e.message;
        next(err); // Pass the error to the error handler

        // res.status(401).send({"message": e})
    }
});

router.get(
    '/getUsersByCommunity/:communityId',
    auth,
    async (req, res, next) => {
        const { communityId } = req.params;

        const users = await prisma.user.findMany({
            where: {
                societyId: parseInt(communityId),
            },
            select: {
                id: true,
                email: true,
                societyId: true,
                firstName: true,
                role: true,
                userrole: {
                    select: {
                        role: true,
                    },
                },
            },
        });

        res.send({ users });
    }
);

router.get('/userDetails', auth, async (req, res, next) => {
    const { id } = req.user!;

    try {
        const userDetails = await prisma.user.findFirst({
            where: {
                id: id.toString(),
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                userrole: {
                    select: {
                        role: true,
                    },
                },
            },
        });
        res.send(userDetails);
    } catch (error) {
        console.error(error);
        const err = new Error('Invalid Request');
        err.statusCode = 403;
        err.message = 'The request is not valid!';
        next(err);
    }
});

export default router;
