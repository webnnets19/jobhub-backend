import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        image: {
            data: Buffer,
            contentType: String
        },
        role: {
            type: String,
            enum: ['user', 'company', 'admin'],
            default: 'user'
        },
        bio: String,

        // ✅ LOCATION
        location: String,

        skills: [String],

        education: [
            {
                college: String,
                degree: String,
                year: String
            }
        ],

        experience: [
            {
                company: String,
                role: String,
                year: String
            }
        ],
        resume: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
)

export default mongoose.model('User', userSchema)