import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

type User = {
    id: string | number
}
declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const validToken = jwt.verify(token, JWT_SECRET as string) as ({userId : string});
    console.log('vai', validToken)
    //'as string' is called as Type Assertion

    //NOTE: Type Assertion: Using as string tells TypeScript, "Hey, I know this value will definitely be a string, so treat it as one."

    req.user = { id: validToken.userId }; 

    console.log('logged in user is: ', validToken.userId)

    next();
}
