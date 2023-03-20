import express from "express";

import {
  createCar,
  getUserCars,
  getCarById,
  updateCar,
  getCars,
} from "../controllers/carController.js";

const router = express.Router();

router.post("/", createCar);

router.get("/user-cars", getUserCars);

router.get("/:id", getCarById);

router.put("/", updateCar);

router.get("/", getCars);

export default router;
