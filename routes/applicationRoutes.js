// routes/applicationRoute.js

import express from 'express'
import { applyJob, getAppliedJobs, getAllApplications } from '../controllers/applicationController.js'
import protect from '../middleware/authMiddleware.js'  // ← இதை import பண்ணுங்க

const router = express.Router()

// ❌ Before (protect இல்லாம)
// router.post('/apply', applyJob)

// ✅ After (protect add பண்ணுங்க)
router.post('/apply', protect, applyJob)  // ← protect இங்க வரணும்
router.get('/all', getAllApplications)
router.get('/applied', protect, getAppliedJobs)  // ← protect வேணும்
export default router