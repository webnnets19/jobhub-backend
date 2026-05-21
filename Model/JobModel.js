import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true
        },

        job: {
            type: String,
            required: true
        },

        salary: {
            type: Number,   // ✅ better for filtering
            required: true
        },

        currency: {
            type: String,
            default: "₹"
        },

        paymode: {
            type: String,
            default: "LPA"
        },

        mode: {
            type: String // WFH / WFO / HYBRID
        },

        skills: {
            type: [String],
            default: []
        },

        image: {
            type: String
        },

        // ✅ NEW FIELDS
        experience: {
            type: String,
            default: ""
        },

        location: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;