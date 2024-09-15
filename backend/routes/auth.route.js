import expess from "express";
import { getCurrentUser, login, logout, signup } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = expess.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);


router.get("/me",protectRoute, getCurrentUser);

export default router;
