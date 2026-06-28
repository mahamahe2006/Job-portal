import express from 'express'
import { getJobs, getJobsById } from '../controllers/jobController.js';

const router = express.Router()

//Router to get all the job
router.get('/',getJobs)


//Router to get a single job by id
router.get('/:id',getJobsById)


export default router;