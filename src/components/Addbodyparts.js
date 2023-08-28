import React from "react";
import { useState } from "react";
const Addbodyparts = () => {
  const [bodyPart, setbodyPart] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [checktext, setChecktext] = useState(false);
  const [socondchecktext, setSecondChecktext] = useState(false);
  const [tableData, setTableData] = useState([]);

  const handleInputChange = (event) => {
    setbodyPart(event.target.value);
  };

  const AddSymptoms = () => {
    setChecktext(true);
  };

  const handleSymptomsChange = (event) => {
    setSymptoms(event.target.value);
    setSecondChecktext(true);
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
    <div className="container mt-5">
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
