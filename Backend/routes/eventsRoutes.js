import express from "express";
import { getEvents, updateEventStatus } from "../controllers/eventsController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin/Superadmin only
router.use(verifyToken, requireRole(["admin", "superadmin"]));

router.get("/", getEvents);
router.patch("/:id/status", updateEventStatus);

export default router;
