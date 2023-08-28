import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [showCheckboxes, setShowCheckboxes] = useState("");
  const [headsymptoms, setHeadsymptoms] = useState([]);
  const [bodyprt, setBodyprt] = useState([]);
  const [selectedsymptoms, setSelectedsymptoms] = useState([]);

  const [checkboxValues, setCheckboxValues] = useState({
    option_1: false,
    option_2: false,
    option_3: false,
    option_4: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    hospitalname: "",
    city: "",
    // symptoms: "",
    speciality: "",
    role: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/getBodyPart`) // Adjust the API endpoint URL
      .then((response) => response.json())
      .then((data) => setBodyprt(data))
      .catch((error) => console.error("Error fetching symptoms:", error));

    console.log("bodyprt", bodyprt);
  }, []);

  useEffect(() => {
    if (formData.speciality) {
      console.log(formData.speciality);
      console.log("--------------------------------------------------");
      fetch(`http://localhost:5000/getsymptoms/${formData.speciality}`) // Adjust the API endpoint URL
        .then((response) => response.json())
        .then((data) => setHeadsymptoms(data))
        .catch((error) => console.error("Error fetching symptoms:", error));
    }
    console.log("headsymptoms", headsymptoms);
    console.log("bodyprt", bodyprt);
  }, [formData.speciality]);

  useEffect(() => {
    console.log("bodyprt", bodyprt);
  }, [formData.role]);

  useEffect(() => {
    console.log("headsymptoms", headsymptoms);
  }, [headsymptoms]);

  const handleRoleChange = (event) => {
    if (
      event.target.value === "head" ||
      event.target.value === "heart" ||
      event.target.value === "Chest"
    ) {
      setShowCheckboxes(event.target.value);
      const { id, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else {
      setSelectedRole(event.target.value);
      const { id, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [id]: checked,
    }));
    console.warn(checkboxValues);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    const formDataWithCheckboxes = {
      ...formData,
      checkboxes: selectedsymptoms,
    };


    console.warn("formDataWithCheckboxes",formDataWithCheckboxes)

    if (formData.role === "doctor") {
      try {
        const response = await axios.post(
          "http://localhost:5000/doctor",
          formDataWithCheckboxes
        );

        if (response.data === "exist") {
          console.log("User already exists with this email.");
        } else {
          console.log("Registration successful:", response.data);
          // Perform other actions after successful registration
        }
      } catch (error) {
        console.error("Error registering:", error.message);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/user",
          formDataWithCheckboxes
        );

        if (response.data === "exist") {
          console.log("User already exists with this email.");
        } else {
          console.log("Registration successful:", response.data);
          // Perform other actions after successful registration
        }
      } catch (error) {
        console.error("Error registering:", error.message);
      }
    }
  };

  const handleselectedBodypartwithSymptoms = (event, food) => {
    const sympname = food.name;
    console.log("food", sympname);
    console.log("selected Food", selectedsymptoms);
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedsymptoms([...selectedsymptoms, {sympname }]);
    } else {
      setSelectedsymptoms(
        selectedsymptoms.filter((selected) => selected !== sympname)
      );
    }
  };

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}>
      <div className="mask d-flex align-items-center gradient-custom-3">
        <div className="container" style={{ height: "70vh" }}>
          <div
            className="row mt-4 d-flex justify-content-center align-items-center"
            style={{ height: "70vh" }}>
            <div className="col-12 col-md-9" style={{ height: "70vh" }}>
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-3">
                  <h2 className="text-uppercase text-center mb-3">
                    Add Information
                  </h2>

                  <form onSubmit={handleFormSubmit}>
                    <div className="form-outline mb-2">
                      <input
                        type="text"
                        id="name"
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter Name"
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <input
                        type="email"
                        id="email"
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter Your Email"
                      />
                    </div>

                    <div className="form-outline mb-2">
                      <input
                        type="password"
                        id="password"
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="*****"
                      />
                    </div>

                    <div className="form-outline mb-2">
                      <select
                        className="form-select"
                        id="role"
                        aria-label="Select option"
                        onChange={handleRoleChange}>
                        <option value="">Select Option</option>
                        <option value="user">User</option>
                        <option value="doctor">Doctor</option>
                      </select>
                    </div>

                    {selectedRole === "doctor" && (
                      <>
                        <div className="form-outline mb-2">
                          <input
                            type="text"
                            id="hospitalname"
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter Hospital Name"
                          />
                        </div>

                        <div className="form-outline mb-2">
                          <input
                            type="text"
                            id="city"
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter City Name"
                          />
                        </div>

                        <div className="form-outline mb-1">
                          <select
                            className="form-select"
                            id="speciality"
                            aria-label="Select option"
                            onChange={handleRoleChange}
                            value={formData.speciality}>
                            <option value="">Select an Specialization</option>
                            {bodyprt.map((option, index) => (
                              <option key={index} value={option.name}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="row mb-3">
                        <div className="col-12 d-flex flex-wrap">
                          {headsymptoms.map((bodypartname) => (
                             <div className="col-3 flex-wrap">
                            <div className="d-flex" key={bodypartname._id}>
                            
                                <input
                                  type="checkbox"
                                  onChange={(event) =>
                                    handleselectedBodypartwithSymptoms(event, bodypartname)
                                  }
                                />
                                  <h6 className="mx-1">{bodypartname.name}</h6>     
                            </div>
                            </div>
                          ))}
                          </div>
                        </div>

                        {/* 
                        {showCheckboxes === "head" && (
                          <div className="row mb-3">
                            <label>Head Symptoms</label>
                            <div className="col-12 d-flex">
                              <div className="col-3">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="checkbox1"
                                    id="neck"
                                    checked={checkboxValues.neck}
                                    onChange={handleCheckboxChange}
                                  />
                                  Neck stiffness
                                </label>
                              </div>
                              <div className="col-3">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="checkbox2"
                                    id="headache"
                                    checked={checkboxValues.headache}
                                    onChange={handleCheckboxChange}
                                  />
                                  Headache
                                </label>
                              </div>
                              <div className="col-3">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="checkbox3"
                                    id="fever"
                                    checked={checkboxValues.fever}
                                    onChange={handleCheckboxChange}
                                  />
                                  Fever
                                </label>
                              </div>
                              <div className="col-3">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="checkbox4"
                                    id="confusion"
                                    checked={checkboxValues.confusion}
                                    onChange={handleCheckboxChange}
                                  />
                                  Confusion
                                </label>
                              </div>
                            </div>
                          </div>
                        )}

                        {showCheckboxes === "heart" && (
                          <div className="row mb-3">
                            <label>Heart Symtums</label>
                            <div className="col-12 d-flex">
                              <div className="col-2">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="checkbox1"
                                    id="option_1"
                                    checked={checkboxValues.option_1}
                                    onChange={handleCheckboxChange}
                                  />
                                  coronary heart disease
                                </label>
                              </div>
                              <div className="col-2">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="checkbox2"
                                    id="option_2"
                                    checked={checkboxValues.option_2}
                                    onChange={handleCheckboxChange}
                                  />
                                  Angina
                                </label>
                              </div>
                              <div className="col-2">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="checkbox3"
                                    id="option_3"
                                    checked={checkboxValues.option_3}
                                    onChange={handleCheckboxChange}
                                  />
                                  Heart failure
                                </label>
                              </div>
                              <div className="col-2">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="checkbox4"
                                    id="option_4"
                                    checked={checkboxValues.option_4}
                                    onChange={handleCheckboxChange}
                                  />
                                  Heart attack
                                </label>
                              </div>
                            </div>
                          </div>
                        )}

                        {showCheckboxes === "Chest" && (
                          <div className="row mb-3">
                            <label>Chest Symtums</label>
                            <div className="col-12 d-flex">
                              <div className="col-2">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="checkbox1"
                                    id="option_1"
                                    checked={checkboxValues.option_1}
                                    onChange={handleCheckboxChange}
                                  />
                                  Obesity hypoventilation syndrome
                                </label>
                              </div>
                              <div className="col-2">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="checkbox2"
                                    id="option_2"
                                    checked={checkboxValues.option_2}
                                    onChange={handleCheckboxChange}
                                  />
                                  pulmonary disease
                                </label>
                              </div>
                             
                            </div>
                          </div>
                        )} */}
                      </>
                    )}

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-3 mb-0">
                      Have already an account?{" "}
                      <a href="/" className="fw-bold text-body">
                        <u>Login here</u>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
