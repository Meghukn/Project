import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    brand: {
      type : String,
      required : true
    },
    model: {
      type : String,
      required: true,
    },
    color: {             
      type: String
    },
    year: {
      type: Number,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {timestamps: true}
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;