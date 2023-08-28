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
    <div className="mt-5">
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
                      <th>Symptoms</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor._id}>
                        <td>{doctor.dataWithSymptoms.doctor.name}</td>
                        <td>{doctor.dataWithSymptoms.doctor.email}</td>
                        <td>{doctor.dataWithSymptoms.doctor.hospitalname}</td>
                        <td>{doctor.dataWithSymptoms.doctor.city}</td>
                        <td>{doctor.dataWithSymptoms.doctor.speciality}</td>
                        <td>
                          <ul>
                            {doctor.dataWithSymptoms.symptoms.map((symptom) => (
                              <li key={symptom._id}>{symptom.name}</li>
                            ))}
                          </ul>
                        </td>
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
