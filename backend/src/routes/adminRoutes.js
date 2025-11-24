import express from "express";
import { loginAdmin } from "../controllers/adminController";

const router = express.Router();

// admin log in
router.post("/login", loginAdmin);

router.get("/dashboard ", (req, res) => {
    res.json({ message: `Welcome admin ${req.user.email}`});
})

export default router;