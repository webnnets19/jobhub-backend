import express from 'express'
import upload from '../middleware/upload.js'

import {
    registerUser,
    loginUser,
    getUserProfile,
    updateProfile,
    addEducation,
    addExperience,
    updateEducation,
    updateExperience,
    deleteEducation,
    deleteExperience,
    getAllUsers, deleteUser
} from '../controllers/userController.js'

const router = express.Router()

// GET ALL USERS
router.get('/', getAllUsers)
router.delete("/:id", deleteUser)
// REGISTER
router.post(
    '/register',
    upload.single('image'),
    registerUser
)

// LOGIN
router.post('/login', loginUser)

// PROFILE
router.get('/profile/:id', getUserProfile)


// ================= EDUCATION =================

// ADD EDUCATION
router.post(
    '/profile/:id/education',
    addEducation
)

// UPDATE EDUCATION
router.put(
    '/profile/:userId/education/:eduId',
    updateEducation
)

// DELETE EDUCATION
router.delete(
    '/profile/:id/education/:eduId',
    deleteEducation
)

// ================= EXPERIENCE =================

// ADD EXPERIENCE
router.post(
    '/profile/:id/experience',
    addExperience
)

// UPDATE EXPERIENCE
router.put(
    '/profile/:userId/experience/:expId',
    updateExperience
)

// DELETE EXPERIENCE
router.delete(
    '/profile/:id/experience/:expId',
    deleteExperience
)
router.put(
    "/profile/:id",
    upload.single("resume"),
    updateProfile
)
export default router