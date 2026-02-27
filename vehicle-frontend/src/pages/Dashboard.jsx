import { useState, useContext, useEffect } from "react";
import API from "../services/api";
import VehicleCard from "../components/VehicleCard";
import VehicleForm from "../components/VehicleForm";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';

function Dashboard() {

  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
  );

  const data = {
    labels: ["Mon", "Tue", "wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Battery  %",
        data: [92,87,83,75,61,13],
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.2)",
      },
    ],
  };
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
    <div className="container">
      <h2 className="page-title">Your Vehicles</h2>

      {loading ? (
        <p>Loading...</p>
      ) : vehicles.length === 0 ? (
        <div className="empty-state">
          <h3>No Vehicles yet</h3>
          <p>Add your first vehicle to track battery usage.</p>
        </div>
      ) : (
        <div style={{display: "grid"}}>
          {vehicles.map((vehicle) => (
            <VehicleCard key = {vehicle._id} vehicle={vehicle} />
          ))}
          </div>
      )}
      <Line data = {data} />
      <VehicleForm onVehicleAdded = {handleVehicleAdded} />
    </div>
  );
}

export default Dashboard;