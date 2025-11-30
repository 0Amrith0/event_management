import express from "express";
import { getProfile, newProfile, getAllProfiles } from "../controllers/profileController.js";

const router = express.Router();

router.get("/", getAllProfiles);
router.get("/:profileId", getProfile);
router.post("/", newProfile);

export default router;