
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
const Doctorlist=()=>{
    const[symptoms,setSymptoms]=useState([])
    const location=useLocation();
    const {selectedsymptoms,bodyPartname}=location.state;



    useEffect(() => {
      console.log("bodyPartname", bodyPartname);
      
      // Extract symptom names from the array
      const symptomNames = selectedsymptoms.map(symptom => symptom.sympname);
    
      console.log("selectedsymptoms", symptomNames);
      
      const url = `http://localhost:5000/getdoctorlist?symptomNames=${symptomNames.join(',')}&bodyPartname=${bodyPartname}`;
      
      fetch(url)
        .then(response => response.json())
        .then(data => setSymptoms(data))
        // .then(data => console.log(data))
        .catch(error => console.error('Error fetching symptoms:', error));
    }, [selectedsymptoms, bodyPartname]);
    
    


    return(
      <div className="mt-0">



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






      <div class="container mt-3">
        <div class="row ">
          <div class="col-md-offset-1 justify-content-center col-md-12 ">
            <div class="panel">
              <div class="panel-heading"></div>
              <div
                class="panel-body table-responsive"
                style={{ maxHeight: "500px", overflowY: "scroll" }}>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Hospital Name</th>
                      <th>City</th>
                      <th>Speciality</th>
                    </tr>
                  </thead>
                  <tbody>
                    {symptoms.map((doctor) => (
                      <tr key={doctor._id}>
                        <td>{doctor.name}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.hospitalname}</td>
                        <td>{doctor.city}</td>
                        <td>{doctor.speciality}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default Doctorlist;