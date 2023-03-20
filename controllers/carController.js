import Car from "../models/Car.js";
import jwt from "jsonwebtoken";

const createCar = async (req, res) => {
  const { token } = req.cookies;
  const {
    brand,
    model,
    location,
    photos: addedPhotos,
    description,
    seats,
    doors,
    transmission,
    aircon,
    trunk,
    consumption,
    price,
  } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, cookieData) => {
    if (err) throw err;
    const carDoc = await Car.create({
      owner: cookieData.id,
      brand,
      model,
      location,
      addedPhotos,
      description,
      seats,
      doors,
      transmission,
      aircon,
      trunk,
      consumption,
      price,
    });
    res.json(carDoc);
  });
};

const getUserCars = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, cookieData) => {
    if (err) throw err;
    const { id } = cookieData;
    // fetching cars for this specific. user
    res.json(await Car.find({ owner: id }));
  });
};

const getCarById = async (req, res) => {
  const { id } = req.params;
  res.json(await Car.findById(id));
};

const updateCar = async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    brand,
    model,
    location,
    photos: addedPhotos,
    description,
    seats,
    doors,
    transmission,
    aircon,
    trunk,
    consumption,
    price,
  } = req.body;

  // Verify user updates the car is the same who created
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, cookieData) => {
    if (err) throw err;
    // fetch our car
    const carDoc = await Car.findById(id);
    if (carDoc.owner.toString() === cookieData.id) {
      carDoc.set({
        brand,
        model,
        location,
        photos: addedPhotos,
        description,
        seats,
        doors,
        transmission,
        aircon,
        trunk,
        consumption,
        price,
      });
      await carDoc.save();
      res.json("ok");
    }
  });
};

const getCars = async (req, res) => {
  res.json(await Car.find());
};

export { createCar, getUserCars, getCarById, updateCar, getCars };
