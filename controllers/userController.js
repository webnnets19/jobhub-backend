import User from '../Model/UserModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    )
}

// REGISTER USER
// REGISTER USER
export const registerUser = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            role
        } = req.body

        const image = req.file
            ? `/uploads/${req.file.filename}`
            : ''

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            image,
            role
        })

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            token: generateToken(user._id)
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}
// LOGIN USER
// USER LOGIN

export const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body

        const user = await User.findOne({ email })

        if (
            user &&
            await bcrypt.compare(password, user.password)
        ) {

            res.json({

                _id: user._id,

                name: user.name,

                email: user.email,

                image: user.image,

                role: user.role,

                token: generateToken(user._id)

            })

        } else {

            res.status(401).json({
                message: 'Invalid credentials'
            })

        }

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}
//get all user
export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find()

        res.json(users)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}
// GET PROFILE
export const getUserProfile = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.json(user)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}

// UPDATE PROFILE
export const updateProfile = async (req, res) => {

    try {

        const { bio, location, skills } = req.body

        console.log(req.body)
        console.log(req.file)

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                bio,
                location,
                skills: skills.split(",").map(skill => skill.trim()),
                resume: req.file
                    ? `/uploads/${req.file.filename}`
                    : undefined
            },
            { new: true }
        )

        res.json({
            user: updatedUser
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}
// ADD EDUCATION
export const addEducation = async (req, res) => {
    try {

        const {
            college,
            degree,
            year
        } = req.body

        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        user.education.push({
            college,
            degree,
            year
        })

        await user.save()

        res.json(user)

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
}

// UPDATE EDUCATION
export const updateEducation = async (req, res) => {
    try {

        const {
            userId,
            eduId
        } = req.params

        const {
            college,
            degree,
            year
        } = req.body

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const edu = user.education.id(eduId)

        if (!edu) {
            return res.status(404).json({
                message: 'Education not found'
            })
        }

        edu.college = college
        edu.degree = degree
        edu.year = year

        await user.save()

        res.json(user)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}

// DELETE EDUCATION
export const deleteEducation = async (req, res) => {

    try {

        const { id, eduId } = req.params

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        user.education = user.education.filter(
            (edu) => edu._id.toString() !== eduId
        )

        await user.save()

        res.json(user)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}

// ADD EXPERIENCE
export const addExperience = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const newExp = {
            company: req.body.company,
            role: req.body.role,
            year: req.body.year
        }

        user.experience.push(newExp)

        const updatedUser = await user.save()

        res.json(updatedUser)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}

// UPDATE EXPERIENCE
export const updateExperience = async (req, res) => {
    try {

        const {
            userId,
            expId
        } = req.params

        const {
            company,
            role,
            year
        } = req.body

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const exp = user.experience.id(expId)

        if (!exp) {
            return res.status(404).json({
                message: 'Experience not found'
            })
        }

        exp.company = company
        exp.role = role
        exp.year = year

        await user.save()

        res.json(user)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}

// DELETE EXPERIENCE
export const deleteExperience = async (req, res) => {

    try {

        const { id, expId } = req.params

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        user.experience = user.experience.filter(
            (exp) => exp._id.toString() !== expId
        )

        await user.save()

        res.json(user)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        await user.deleteOne()

        res.status(200).json({ message: "User deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}