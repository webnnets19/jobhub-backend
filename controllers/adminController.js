import Admin from '../Model/AdminModel.js'
import Company from "../Model/companyModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    )
}

// REGISTER ADMIN
export const registerAdmin = async (req, res) => {
    try {

        const { name, email, password } = req.body

        const adminExists = await Admin.findOne({ email })

        if (adminExists) {
            return res.status(400).json({
                success: false,
                message: 'Admin already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            role: "admin"
        })

        return res.status(201).json({
            success: true,
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// LOGIN ADMIN
export const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body

        const admin = await Admin.findOne({ email })

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Admin not found"
            })
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            {
                id: admin._id,
                role: admin.role || "admin"
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.status(200).json({
            success: true,
            name: admin.name,
            email: admin.email,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// APPROVE COMPANY (ADMIN)
export const approveCompany = async (req, res) => {
    try {

        const company = await Company.findById(req.params.id)

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            })
        }

        company.isApproved = true
        company.status = "approved"   // ✅ ADD THIS

        await company.save()

        res.status(200).json({
            success: true,
            message: "Company approved successfully",
            company
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const rejectCompany = async (req, res) => {
    try {

        const company = await Company.findById(req.params.id)

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            })
        }

        company.isApproved = false
        company.status = "rejected"

        await company.save()

        res.status(200).json({
            success: true,
            message: "Company rejected successfully",
            company
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}