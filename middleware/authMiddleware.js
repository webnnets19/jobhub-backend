import jwt from 'jsonwebtoken'
import User from '../Model/UserModel.js'
import Company from '../Model/companyModel.js'

const protect = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "No token"
            })
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        let user = await User.findById(decoded.id)

        if (!user) {
            user = await Company.findById(decoded.id)
        }

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        req.user = user

        next()

    } catch (error) {

        console.log(error)

        return res.status(401).json({
            message: "Token invalid or expired"
        })
    }
}

export default protect