import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
import { User } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();


// create task
// update task
// asign task
// update priority
// update task status
// delete task //change status to deleted
// comment on the task

router.use(auth);

router.post('/create', async (req, res)=> {
    const { title, description } = req.body;

    const {id, communityId} = req.user as User;

    res.status(200).send({message: 'task created successfully!', title, description, id, communityId})
})

router.put('/update', async (req, res) => {
    const { title, description, taskId } = req.body;

    const {id, communityId} = req.user as User;

    res.status(200).send({title, description, taskId});
})

router.post('/assign/task', async (req, res) => {
    const { taskId, assignTo } = req.body;

    const {id, communityId} = req.user as User;

    res.status(200).send({message: 'task assigned successfully to the user: '})
})

router.get('/update/priority/:priorityId/:taskId', async (req, res) => {
    const { priorityId, taskId } = req.params;

    const {id, communityId} = req.user as User;

    res.status(200).send({message: 'priority updated successfully for the task'})
})

router.get('/update/taskstatus/:taskStatusId/:taskId', async (req, res) => {
    const { taskStatusId, taskId } = req.params;

    const {id, communityId} = req.user as User;

    res.status(200).send({message: 'priority updated successfully for the task'})
})

router.post('/log/comment', async (req, res) => {
    const { comment, taskId } = req.body;

    const {id, communityId} = req.user as User;

    res.status(200).send({message: 'comment added against the task with id: '})
})

export default router;