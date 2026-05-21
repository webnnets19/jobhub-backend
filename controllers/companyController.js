import Company from "../Model/companyModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTER
export const registerCompany = async (req, res) => {
    try {

        const {
            companyName,
            email,
            password,
            phone,
            website,
            location,
            industry,
            companySize,
            description,
            companyRegisterDate
        } = req.body;

        if (!companyName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const existing = await Company.findOne({ email });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Company already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const company = await Company.create({
            companyName,
            email,
            password: hashedPassword,
            phone,
            website,
            location,
            industry,
            companySize,
            description,
            companyRegisterDate,

            logo: req.body.logo
                ? {
                    data: Buffer.from(
                        req.body.logo.split(',')[1],
                        'base64'
                    ),
                    contentType: req.body.logo.split(';')[0].split(':')[1]
                }
                : null,

            role: "company",
            isApproved: false
        });

        res.status(201).json({
            success: true,
            message: "Company registered successfully",
            company
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// LOGIN
export const loginCompany = async (req, res) => {
    try {

        const { email, password } = req.body

        const company = await Company.findOne({ email })

        if (!company) {
            return res.status(400).json({
                success: false,
                message: "Company not found"
            })
        }

        // ❌ BLOCK IF NOT APPROVED
        if (!company.isApproved) {
            return res.status(403).json({
                success: false,
                message: "Admin approval pending"
            })
        }

        const isMatch = await bcrypt.compare(password, company.password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            {
                id: company._id,
                role: company.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.status(200).json({
            _id: company._id,
            companyName: company.companyName,
            email: company.email,

            logo: company.logo?.data
                ? `data:${company.logo.contentType};base64,${company.logo.data.toString('base64')}`
                : '',

            role: company.role,
            token,
            message: "Login Successful"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// GET PROFILE
export const getCompanyProfile = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        res.status(200).json({
            success: true,
            company
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// GET ALL
export const getAllCompanies = async (req, res) => {
    const companies = await Company.find()

    const modifiedCompanies = companies.map((company) => {

        let logo = null

        if (company.logo?.data) {
            logo = `data:${company.logo.contentType};base64,${company.logo.data.toString('base64')}`
        }

        return {
            ...company._doc,
            logo
        }
    })

    res.status(200).json(modifiedCompanies)
};


// DELETE
export const deleteCompany = async (req, res) => {
    try {

        const company = await Company.findByIdAndDelete(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Company deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE PROFILE
export const updateCompanyProfile = async (req, res) => {
    try {

        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        const {
            companyName,
            description,
            location,
            website
        } = req.body;

        company.companyName = companyName || company.companyName;
        company.description = description || company.description;
        company.location = location || company.location;
        company.website = website || company.website;

        if (req.file) {
            company.logo = req.file.path;
        }

        const updated = await company.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            company: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ✅ ADMIN APPROVE
export const approveCompany = async (req, res) => {
    try {

        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        company.isApproved = true;   // ✅ FIXED
        await company.save();

        res.status(200).json({
            success: true,
            message: "Company approved successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};