import express from "express";
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import communityRoutes from './routes/communityRoutes';

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/', userRoutes);
app.use('/api/', communityRoutes);


export default app;