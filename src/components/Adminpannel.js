import React, { useEffect, useState } from "react";
const Adminpannel = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await fetch("http://localhost:5000/doctordata");
        const data = await response.json();
        setDoctors(data);
        console.log(data);
      } catch (error) {
        console.warn("error");
      }
    }
    fetchDoctors();
  }, []);

  const handleAccept = async (doctorId) => {
    console.log("-----------------");
    try {
      const response = await fetch("http://localhost:5000/acceptDoctor", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctorId }),
      });
      // Handle the response as needed
    } catch (error) {
      console.error("Error accepting doctor:", error);
    }
  };

  const handleReject = async (doctorId) => {
    try {
      const response = await fetch("http://localhost:5000/rejectDoctor", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctorId }),
      });
      // Handle the response as needed
    } catch (error) {
      console.error("Error rejecting doctor:", error);
    }
  };

  return (
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


      <div class="container">
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
                      {/* <th>Symptoms</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor._id}>
                        <td>{doctor.name}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.hospitalname}</td>
                        <td>{doctor.city}</td>
                        <td>{doctor.speciality}</td>
                        {/* <td> */}
                          {/* <ul>
                            {doctor.dataWithSymptoms.symptoms.map((symptom) => (
                              <li key={symptom._id}>{symptom.name}</li>
                            ))}
                          </ul> */}
                        {/* </td> */}
                        <td>
                          <ul class="action-list">
                            <li>
                              <button
                                className="btn btn-success"
                                onClick={() => handleAccept(doctor._id)}>
                                Accept
                              </button>
                            </li>
                            <li>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleReject(doctor._id)}>
                                Reject
                              </button>
                            </li>
                          </ul>
                        </td>
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
  );
};
export default Adminpannel;
