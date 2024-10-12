
import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import communityRoutes from './routes/communityRoutes';
import { auth } from './middleware/auth';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get('/', (req, res)=> {
    console.log('req', req.user)
    res.send({message: req.user})
})

app.use('/api/user/', userRoutes);
app.use('/api/', communityRoutes);


export default app;