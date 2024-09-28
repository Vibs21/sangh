import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import app from '../index';

//mock dependencies

jest.mock('@prisma/client', ()=> {
    // PrismaClient.user.findFirst

    const mPrismaClient = {
        user: {
            findFirst: jest.fn()
        }
    }
    return {PrismaClient: jest.fn(()=> mPrismaClient)}
})

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('POST /api/singin', ()=> {
    const prisma = new PrismaClient();
    const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' } //treat it as an entry from the DB

    beforeEach(()=> {
        jest.clearAllMocks();
        process.env.JWT_SECRET = 'test_secret'
    })

    it('should return a token and userid for valid user credentials', async ()=> {
        // user ne id aur password bheja hai, vo match kr raha hai, mock user ke sath
        //yaha hum preset kar rahe hai ki, ye 3ino method call ka ans ky hone vala hai, with the jelp of
        // jest.fn()
        (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue('fake_jwt_token')


        //simuliting the http request using the request ojb from supertest
        const response = await request(app).post('/api/signin')
                                            .send({'email':'test@example.com','password':'testPassword'})


        //expect mai, specially toHaveBeenCalledWith mai...actual implementation likh hai library ki functionality ka
        // jaise ki, bcrypt ke compare main 1st arg plainPassword, 2nd arg. hasedPassword, vaise he JWT ke implementation mai
        // jo fucntion actual mai demand karta hai vohi bhejna hai
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
                { message: "User authenticated successfully", token: 'fake_jwt_token', userId: 1 });
        expect(prisma.user.findFirst).toHaveBeenCalledWith({
            where: {email: 'test@example.com'}
        })
        expect(bcrypt.compare).toHaveBeenCalledWith('testPassword', 'hashedPassword');
        expect(jwt.sign).toHaveBeenCalledWith({userId: 1, }, 'test_secret', { expiresIn: '800h' })

    })

    it('should return 401 in case of invalid email and password', async()=> {
        (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        const response = await request(app)
                        .post('/api/signin')
                        .send({'email': 'test@example.com', password: 'incorrectPassword' });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Invalid email or password' });
    })

    it('should return 401 if JWT secret is missing', async()=> {
        (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        delete process.env.JWT_SECRET;

        const response = await request(app)
                                        .post('/api/signin')
                                        .send({email: 'test@example.com', password: 'testPassword'});
                                        
        expect(response.status).toBe(401);
        expect(response.body).toEqual({message: 'Invalid JWT secret'})
    })
})


// jest.mock('./greet', () => ({
//     getName: jest.fn(() => 'Mocked Name'),  /** Mock `getName` to return "Mocked Name"  */
//     greet: jest.requireActual('./greet').greet, /**Use the real implementation of `greet` */
// }));