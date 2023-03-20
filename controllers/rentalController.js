import Rental from "../models/Rental.js";
import { getUserInfoFromRequest } from "../helpers/userInfo.js";

const rentCar = async (req, res) => {
  const userInfo = await getUserInfoFromRequest(req);
  const { car, checkIn, checkOut, name, phone, price } = req.body;
  Rental.create({
    car,
    checkIn,
    checkOut,
    name,
    phone,
    price,
    user: userInfo.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((error) => {
      throw error;
    });
};

const getRentedCar = async (req, res) => {
  const userInfo = await getUserInfoFromRequest(req);
  res.json(await Rental.find({ user: userInfo.id }).populate("car"));
};

export { rentCar, getRentedCar };
