// // import express from 'express'
// // import mongoose from 'mongoose'
// // import dotenv from 'dotenv'
// // import cors from 'cors'

// // import userRoutes from './routes/UserRoutes.js'
// // import companyRoutes from './routes/companyRoutes.js'
// // import adminRoutes from "./routes/adminRoute.js"
// // import jobRoutes from "./routes/jobRoute.js";
// // dotenv.config()

// // const app = express()
// // import applicationRoutes from './routes/applicationRoutes.js'


// // app.use(cors({
// //     origin: ["https://webnnets.co.in/demojobhub", "https://webnnets.co.in/demojobhubadmin"],
// //     credentials: true
// // }))
// // app.use(express.json())
// // app.use(express.urlencoded({ extended: true }))
// // app.use("/api/admin", adminRoutes)
// // // ✅ STATIC FILES (IMPORTANT)
// // app.use('/uploads', express.static('uploads'))

// // // DB CONNECT
// // mongoose.connect(process.env.MONGO_URL)
// //     .then(() => console.log('MongoDB Connected'))
// //     .catch(err => console.log(err))

// // // ROUTES
// // app.use('/api/users', userRoutes)
// // app.use('/api/companies', companyRoutes)

// // app.use("/api/jobs", jobRoutes);
// // app.use("/api/jobs", jobRoutes);
// // app.use('/api/application', applicationRoutes)


// // app.get("/", (req, res) => {
// //     res.send("Backend Running")
// // })
// // // SERVER
// // export default app


// import express from 'express'
// import mongoose from 'mongoose'
// import cors from 'cors'

// import userRoutes from './routes/UserRoutes.js'
// import companyRoutes from './routes/companyRoutes.js'
// import adminRoutes from "./routes/adminRoute.js"
// import jobRoutes from "./routes/jobRoute.js"
// import applicationRoutes from './routes/applicationRoutes.js'

// const app = express()
// app.use(cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: false
// }))
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// // DB CONNECT
// mongoose.connect(process.env.MONGO_URL)
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err))

// // ROUTES
// app.use('/api/users', userRoutes)
// app.use('/api/companies', companyRoutes)
// app.use('/api/admin', adminRoutes)
// app.use("/api/jobs", jobRoutes)
// app.use('/api/application', applicationRoutes)
// app.get("/debug", (req, res) => {
//     res.json({
//         mongo: process.env.MONGO_URL ? "✅ Set" : "❌ Missing",
//         jwt: process.env.JWT_SECRET ? "✅ Set" : "❌ Missing",
//         node_env: process.env.NODE_ENV
//     })
// })

// app.get("/debug", (req, res) => {
//     res.json({
//         mongo: process.env.MONGO_URL ? "✅ Set" : "❌ Missing",
//         jwt: process.env.JWT_SECRET ? "✅ Set" : "❌ Missing",
//         mongoUrl: process.env.MONGO_URL // exact value காட்டும்
//     })
// })
// app.get("/", (req, res) => {
//     res.send("Backend Running")
// })

// export default app
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/UserRoutes.js'
import companyRoutes from './routes/companyRoutes.js'
import adminRoutes from "./routes/adminRoute.js"
import jobRoutes from "./routes/jobRoute.js"
import applicationRoutes from './routes/applicationRoutes.js'

dotenv.config()

const app = express()

// CORS
app.use(cors({
    origin: [
        "https://webnnets.co.in",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

// BODY LIMIT
app.use(express.json({ limit: '10mb' }))

app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}))

// MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('DB Error:', err.message))
// Routes
app.use('/api/users', userRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/admin', adminRoutes)
app.use("/api/jobs", jobRoutes)
app.use('/api/application', applicationRoutes)

app.get("/", (req, res) => {
    res.send("Backend Running")
})

export default app