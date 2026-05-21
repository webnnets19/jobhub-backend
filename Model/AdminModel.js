import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    image: String
}, { timestamps: true })

export default mongoose.model('Admin', adminSchema)