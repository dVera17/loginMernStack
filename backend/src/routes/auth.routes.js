import { Router } from "express";
import { userDTO } from "../Dtos/userDto.js";
import { authController } from "../controllers/auth.controller.js";
const router = Router();

router.post('/register', userDTO, authController.registerUser);
router.post('/login', userDTO, authController.loginUser);
router.post('/logout', authController.logoutUser);

export default router;