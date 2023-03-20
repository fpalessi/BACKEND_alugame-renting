import mongoose from "mongoose";

const RentalSchema = mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Car" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: { type: Number },
});

const Rental = mongoose.model("Rental", RentalSchema);
export default Rental;
