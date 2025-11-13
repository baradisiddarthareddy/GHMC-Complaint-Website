import express from "express";
import { getNearbyAuthorities } from "../controllers/authorityController.js";

const router = express.Router();

router.get("/nearby", getNearbyAuthorities);

export default router;
