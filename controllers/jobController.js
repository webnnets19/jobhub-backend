import Job from "../Model/JobModel.js";

// CREATE JOB POST
export const createJob = async (req, res) => {
    try {
        const {
            company,
            job,
            salary,
            currency,
            paymode,
            mode,
            skills,
            experience,   // ✅ ADD
            location      // ✅ ADD
        } = req.body;

        const newJob = await Job.create({
            company,
            job,
            salary,
            currency,
            paymode,
            mode,

            skills: skills ? JSON.parse(skills) : [],

            // ✅ NEW FIELDS SAVED
            experience,
            location,

           image: req.file 
    ? `https://jobhub-backend-f5u9.onrender.com/uploads/${req.file.filename}` 
    : ""
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            job: newJob
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET ALL JOBS
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate('company')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET SINGLE JOB
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
