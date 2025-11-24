import express from "express";
import { loginAdmin } from "../controllers/adminController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// admin log in
router.post("/login", loginAdmin);

router.get("/dashboard", protect, (req, res) => {
    res.json({ message: `Welcome admin ${req.user.email}`});
})

export default router;