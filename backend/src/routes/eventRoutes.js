import express from "express";
import { getEvents, getEvent, newEvent, updateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/profile/:profileId", getEvents);
router.get("/event/:eventId", getEvent);
router.post("/", newEvent);
router.put("/event/:eventId", updateEvent);

export default router;