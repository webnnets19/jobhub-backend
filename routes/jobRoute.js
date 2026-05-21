import express from "express";
import {
    createJob,
    getJobs,
    getJobById
} from "../controllers/jobController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);

export default router;