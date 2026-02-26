import express from "express";
import Vehicle from "../models/Vehicle.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/",protect, async (req,res) => {
  try {
    const {brand, model, year, color} = req.body;

    if (!brand || !model || !year) {
      return res.status(400).json ({
        message: "Brand,model and year are required"
      });
    }
    const vehicle = await Vehicle.create({
      brand,
      model,
      year,
      color,
      user: req.user._id
    });

    res.status(201).json(vehicle);
  }catch(error) {
    res.status(500).json({ message: error.message});
  }
});

router.get("/", protect, async (req,res)=> {
  try {
    const vehicles = (await Vehicle.find({ user: req.user._id}).sort({createdAt : -1}));

    res.json(vehicles);

  }catch(error) {
    res.status(500).json({message: error.message})
  }
});

router.put("/:id", protect, async (req,res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if(!vehicle) {
    return res.status(404).json({message: "Vehicle not found"});
  }

  if (vehicle.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({message: "Not authorized"});
  }

  vehicle.brand = req.body.brand || vehicle.brand;
  vehicle.model = req.body.model || vehicle.model;
  vehicle.year = req.body.year || vehicle.year;
  vehicle.color = req.body.color || vehicle.color;
  
  await vehicle.save();

  res.json(vehicle);
})

export default router;