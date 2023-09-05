import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addspecilization = () => {
  const navigate = useNavigate();
  const [sps, setSps] = useState("");

  const handleSpecializationChange = (event) => {
    setSps(event.target.value);
    console.log(sps);
  };

  const AddSymptoms = () => {
    const requestData = {
      specialization: sps,
    };

    const apiUrl = "http://localhost:5000/saveDoctorSpecialization";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data saved successfully:", data);
        navigate("/Addbodyparts", { state: { sps, data } });
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <div>
     <div>

<nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <a className="navbar-brand text-white font-weight-bold" href="Adminpan">
    Doctor Guaide with Symptoms
  </a>
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a className="nav-link text-white" href="Adminpan">
          Home
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-white" href="Addspecilization">
          Add Specialization
        </a>
      </li>
    </ul>
  </div>
</nav>
</div>
    



      <div className="container">







            <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="form-group">
            <label>Enter Text:</label>
            <input
              type="text"
              className="form-control"
              value={sps}
              onChange={handleSpecializationChange}
            />
          </div>
          <button className="btn btn-primary" onClick={AddSymptoms}>
            Add Text to Table
          </button>
        </div>
        </div>
        </div>
    </div>
  );
};
export default Addspecilization;
