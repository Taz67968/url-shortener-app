import express from "express";

import registrationHandler from "../controllers/userRegistration.js";
import { loginValidator, validate } from "../validators/auth-user-validator.js";
import userLoginHandler from "../controllers/userlogin.js";
const router = express.Router()

router.post("/userRegister", validate, registrationHandler)
router.post("/userLogin", loginValidator, userLoginHandler )
export default router