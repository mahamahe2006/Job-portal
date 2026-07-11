import express from 'express'
import { getUserData, getUserJobApplications, postForJob, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'

const router = express.Router()


//get user data
router.get('/user',getUserData)

//apply for a job
router.post('/apply',postForJob)

//get applied job data
router.get('/applications',getUserJobApplications)

//update user profile(resume)
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router;