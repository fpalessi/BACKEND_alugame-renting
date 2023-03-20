import express from "express";

import { rentCar, getRentedCar } from "../controllers/rentalController.js";

const router = express.Router();

router.post("/", rentCar);

router.get("/", getRentedCar);

export default router;
