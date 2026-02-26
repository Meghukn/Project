import { useState, useContext, useEffect } from "react";
import API from "../services/api";
import VehicleCard from "../components/VehicleCard";
import VehicleForm from "../components/VehicleForm";


function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data } = await API.get("/vehicles");
      setVehicles(data);
    } catch(error) {
      if (error.response?.status === 401){
        localStorage.removeItem("userInfo");
        window.location.href='/';
      }
    } finally{
      setLoading(false);
    }
  };

  const handleVehicleAdded = (newVehicle) => {
    setVehicles([newVehicle, ...vehicles]);
  };

  return(
    <div>
      <h2>Your Vehicles</h2>

      {loading ? (
        <p>Loading...</p>
      ) : vehicles.length === 0 ? (
        <p>No vehicles found</p>
      ) : (
        <div>
          {vehicles.map((vehicle) => (
            <VehicleCard key = {vehicle._id} vehicle={vehicle} />
          ))}
          </div>
      )}
      <VehicleForm onVehicleAdded = {handleVehicleAdded} />
    </div>
  );
}

export default Dashboard;