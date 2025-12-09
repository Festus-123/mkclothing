import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getLogs } from "../controllers/logsController.js";

const router = express.Router();

router.get('/', protect, getLogs)

export default router