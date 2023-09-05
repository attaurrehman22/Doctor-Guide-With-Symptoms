import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Selectingparts = () => {
    const navigate=useNavigate()
    const [bodyParts, setBodyParts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/getbodyparts')  // Adjust the API endpoint URL
          .then(response => response.json())
          .then(data => setBodyParts(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);


      const handleButtonClick = (bodyPart) => {
       const bodyPartID=bodyPart._id;
       const bodyPartname=bodyPart.name;

        console.log('Button clicked with bodyPartId:', bodyPart);
        // window.location.href = `/Selectsymptoms/${bodyPartId}`;
        navigate('/Selectsymptoms',{state:{bodyPartID,bodyPartname}})
      };


  return (
    <div className="custom-body">


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
        <a className="nav-link text-white" href="Selectbodyparts">
          Home
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-white" href="Selectbodyparts">
         Select Body Part
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-white" href="/">
          Logout
        </a>
      </li>
    </ul>
  </div>
</nav>
</div>
      
      <div className="container">
        <main className="center">
            <div className="row d-flex">
                <div className="col-4"></div>
                <div className="col-6 mt-5 justify-content-center align-items-center">
                <h1 className="">Select Body Part</h1>
                </div>

            </div>
            
          {bodyParts.map(bodyPart => (
            <table className="table">
                <tr key={bodyPart._id} class="mt-5">
                    <td>
                    <button type="button" onClick={() => handleButtonClick(bodyPart)} class="btn btn-primary bg-info btn-custom btn-block"><h2 className="text-white">{bodyPart.name}</h2></button>
                    </td>
                </tr>
            </table>
          ))}
        </main>
      </div>
    </div>
  );
};
export default Selectingparts;
