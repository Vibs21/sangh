import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export type User = {
    id: string | number,
    communityId: string
}
declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

//NOTE: As this is fucntion which we are using as a middleware, typescript does not able to infer it,s type and hence we
// explicity need to tell the type of all the req, res, next to the typescript, however it was not needed in case of
// router, as TS knows it a router and they know what is req, res, here it's just a random word with no meaning, by giving the
// type we are actully giving the purpose or defining or telling about the power now it posses by giving the type. 
export function auth(req: Request, res: Response, next: NextFunction) {
    console.log('auth middleware');
    const token = req.header("Authorization")?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
        const validToken = jwt.verify(token, JWT_SECRET as string) as ({userId : string, communityId: string});
  
        //'as string' is called as Type Assertion
    
        //NOTE: Type Assertion: Using as string tells TypeScript, "Hey, I know this value will definitely be a string, so treat it as one."
    
        req.user = { id: validToken.userId, communityId: validToken.communityId }; 
    
        //TODO: Find user by id in the DB to check if it's present or not
    
        console.log('logged in user is: ', validToken.userId)
        next();
    } catch(e) {
        res.status(403).send({message: 'Unauthorized request'});
    }
    

}
