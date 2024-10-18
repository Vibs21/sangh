
import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import communityRoutes from './routes/communityRoutes';
import taskRoutes from './routes/taskRoutes';
import errorHandler from './middleware/errorHandler';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler); //has 4 paramter, which distinguish it from the other middleware with only 3 paramter, req, res and next
// error has 4 param, err, req, res and next

app.get('/', (req, res)=> {
    console.log('req', req.user)
    res.send({message: req.user})
})

app.use('/api/user/', userRoutes);
app.use('/api/', communityRoutes);
app.use('/api/task/', taskRoutes);


export default app;