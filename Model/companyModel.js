import mongoose from "mongoose";

const companySchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String
    },

    website: {
        type: String
    },

    location: {
        type: String
    },

    industry: {
        type: String
    },

    companySize: {
        type: String
    },

    description: {
        type: String
    },

    companyRegisterDate: {
        type: Date
    },
    logo: {
        data: Buffer,
        contentType: String
    },

    // ✅ IMPORTANT ADDITION
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    role: {
        type: String,
        default: "company"
    },

    isApproved: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);

export default Company;