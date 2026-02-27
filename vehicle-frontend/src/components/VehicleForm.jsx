import { useState } from "react";
import API from "../services/api";


function VehicleForm ({ onVehicleAdded }) {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    color: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data} = await API.post("/vehicles", form);

      onVehicleAdded(data);

      setForm({
        brand: "",
        model: "",
        year: "",
        color: ""
      });

    }catch(error) {
      alert(error.response?.data?.message || "Error adding vehicle")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Vehicle</h3>

      <input
        name = "brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
      />

      <input
        name = "model"
        placeholder="Model"
        value={form.model}
        onChange={handleChange}
      />

      <input
        name = "year"
        type="number"
        placeholder="Year"
        value={form.year}
        onChange={handleChange}
      />

      <input
        name = "color"
        placeholder="Color"
        value={form.color}
        onChange={handleChange}
      />

      <button type = "submit" className="button button-primary">Add Vehicle</button>

    </form>
  );
 };

 export default VehicleForm;