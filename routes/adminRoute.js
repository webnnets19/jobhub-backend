import express from "express"
import {
    registerAdmin,
    adminLogin,
    approveCompany,
    rejectCompany
} from "../controllers/adminController.js"


const router = express.Router()

router.post("/register", registerAdmin)
router.post("/login", adminLogin)

// APPROVE CONTROL (IMPORTANT PART)
router.put("/company/:id/approve", approveCompany)
router.put("/company/:id/reject", rejectCompany)

export default router