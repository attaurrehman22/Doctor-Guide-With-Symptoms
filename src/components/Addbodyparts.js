import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const Addbodyparts = () => {

  const location=useLocation();
  const [bodyPart, setbodyPart] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const [checktext, setChecktext] = useState(false);
  const [tableData, setTableData] = useState([]);


  
  const { sps, data } = location.state;
  const docor_specialization=sps;

  useEffect(()=>{
    console.log(docor_specialization)
  })

  const handleInputChange = (event) => {
    setbodyPart(event.target.value);
  };

  const AddSymptoms = () => {
    setChecktext(true);
  };

  const handleSymptomsChange = (event) => {
    setSymptoms(event.target.value);
  };

 

  const handleAddRow = () => {
    if (symptoms) {
      setTableData([...tableData, symptoms]);
      setSymptoms("");
    }
  };


  const handleSave = () => {
    if (bodyPart && tableData.length > 0) {
      const requestData = {
        bodyPart: bodyPart,
        specialization:docor_specialization,
        symptoms: tableData,
      };

      console.log("requestData",requestData)
  
      // Replace with your actual API endpoint
      const apiUrl = "http://localhost:5000/save";
  
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
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    }
  };
  

  return (
    <div className="container mt-0">


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




      <div className="row">
        <div className="col-12">
          <div className="col-4"></div>
          <div className="col-6">Specialization of  : {docor_specialization}</div>
          
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="form-group">
            <label>Enter Text:</label>
            <input
              type="text"
              className="form-control"
              value={bodyPart}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-primary" onClick={AddSymptoms}>
            Add Text to Table
          </button>
        </div>

      </div>

      {checktext && ( 
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            <div className="form-group">
              <label>Enter Symptoms</label>
              <input
                type="text"
                className="form-control"
                value={symptoms}
                onChange={handleSymptomsChange}
              />
            </div>
            <button className="btn btn-primary" onClick={handleAddRow}>
              Add Text to Table
            </button>
          </div>

          <div className="col-md-6 offset-md-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Text</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((text, index) => (
                  <tr key={index}>
                    <td>{text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="col-md-6 offset-md-3 mt-3">
  <button className="btn btn-success" onClick={handleSave}>
    Save
  </button>
</div>
        </div>
      )}
    </div>
  );
};
export default Addbodyparts;
