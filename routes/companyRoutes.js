// import express from "express";
// import upload from "../middleware/upload.js";

// import {
//     registerCompany,
//     loginCompany,
//     getAllCompanies,
//     deleteCompany,
//     getCompanyProfile,
//     updateCompanyProfile,
//     approveCompany
// } from "../controllers/companyController.js";

// const router = express.Router();

// // AUTH
// router.post("/register", upload.single("logo"), registerCompany);
// router.post("/login", loginCompany);

// // PROFILE
// router.get("/profile/:id", getCompanyProfile);
// router.put("/profile/:id", upload.single("logo"), updateCompanyProfile);

// // ADMIN
// router.put("/approve/:id", approveCompany);

// // LIST + DELETE
// router.get("/", getAllCompanies);
// router.delete("/:id", deleteCompany);

// export default router;
import express from "express";
import {
    registerCompany,
    loginCompany,
    getAllCompanies,
    deleteCompany,
    getCompanyProfile,
    updateCompanyProfile,
    approveCompany
} from "../controllers/companyController.js";

const router = express.Router();

// AUTH
router.post("/register", registerCompany);
router.post("/login", loginCompany);

// PROFILE
router.get("/profile/:id", getCompanyProfile);
router.put("/profile/:id", updateCompanyProfile);

// ADMIN
router.put("/approve/:id", approveCompany);

// LIST + DELETE
router.get("/", getAllCompanies);
router.delete("/:id", deleteCompany);

export default router;
