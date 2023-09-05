import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Selectsymptoms=()=>{
    const [symptoms, setSymptoms] = useState([]);
    const [selectedsymptoms, setSelectedsymptoms] = useState([]);
    const navigate=useNavigate();   
    const location=useLocation();
    const {bodyPartID,bodyPartname}=location.state;

    useEffect(() => {
        fetch(`http://localhost:5000/getsympt/${bodyPartID}`)  
          .then(response => response.json())
          .then(data => setSymptoms(data))
          .catch(error => console.error('Error fetching symptoms:', error));
      }, [bodyPartID]);



      const handleButtonClick = () => {
        console.log("0000000000000")
        navigate('/Doctorlist',{state:{selectedsymptoms,bodyPartname}})
      };



      const handleselectedBodypartwithSymptoms = (event, food) => {
        const sympname = food.name;
        console.log("food", sympname);
        const isChecked = event.target.checked;
        if (isChecked) {
          setSelectedsymptoms([...selectedsymptoms, {sympname }]);
        } else {
          setSelectedsymptoms(
            selectedsymptoms.filter((selected) => selected !== sympname)
          );
        }
      };



    return(
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
                  <h1 className="">Select Symptoms</h1>
                  </div>
  
              </div>
              
              {symptoms.map((bodypartname) => (
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

                          <button onClick={handleButtonClick}>Doctor List</button>
          </main>
        </div>
      </div>
    )
}
export default Selectsymptoms