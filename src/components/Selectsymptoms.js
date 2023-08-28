import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Selectsymptoms=()=>{
    const [symptoms, setSymptoms] = useState([]);
    const [selectedsymptoms, setSelectedsymptoms] = useState([]);
    const navigate=useNavigate();   
    const location=useLocation();
    const Uid=location.state?.bodyPartId;

    useEffect(() => {
        fetch(`http://localhost:5000/getsymptoms/${Uid}`)  
          .then(response => response.json())
          .then(data => setSymptoms(data))
          .catch(error => console.error('Error fetching symptoms:', error));
      }, [Uid]);



      const handleButtonClick = () => {
        console.log("0000000000000")
        navigate('/Doctorlist',{state:{selectedsymptoms}})
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