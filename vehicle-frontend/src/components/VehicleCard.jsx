function VehicleCard ({ vehicle }) {

  return (
    <div style = {{
      border: "1px solid #ccc",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "6px"
    }}>
      <h4>{vehicle.brand} {vehicle.model}</h4>
      <p>Year: {vehicle.year}</p>
      <p>Color: {vehicle.color}</p>
    </div>
  );
}

export default VehicleCard;