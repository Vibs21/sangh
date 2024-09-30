import * as dotenv from 'dotenv';
dotenv.config();

export function auth(req : any, res: any, next: any) {

    const token = req.header("Authorization")?.split(' ')[1];

    console.log('token', token)

    next();
}