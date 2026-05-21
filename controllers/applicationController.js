import Application from '../Model/ApplicationModel.js'

export const applyJob = async (req, res) => {
    try {
        const { jobsId, companyId } = req.body
        const userId = req.user?._id

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not found in request"
            })
        }

        if (!jobsId || !companyId) {
            return res.status(400).json({
                success: false,
                message: "Missing job or company id"
            })
        }

        const application = await Application.create({
            user: userId,       // ✅ Fix
            jobs: jobsId,       // ✅ Fix
            company: companyId  // ✅ Fix
        })

        res.status(200).json({
            success: true,
            message: "Applied successfully",
            application
        })

    } catch (error) {
        console.log("APPLY ERROR:", error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET APPLIED JOBS

export const getAppliedJobs = async (req, res) => {
    try {
        const appliedJobs = await Application.find({ user: req.user._id }) // ← filter add
            .populate('jobs')
            .populate('user')

        res.status(200).json({
            jobs: appliedJobs
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllApplications = async (req, res) => {

    try {

        const applications = await Application.find()
            .populate('jobs')
            .populate('user')

        res.status(200).json(applications)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}