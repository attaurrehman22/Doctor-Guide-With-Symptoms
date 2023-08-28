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


      const handleButtonClick = (bodyPartId) => {
        console.log('Button clicked with bodyPartId:', bodyPartId);
        // window.location.href = `/Selectsymptoms/${bodyPartId}`;
        navigate('/Selectsymptoms',{state:{bodyPartId}})
      };


  return (
    <div className="custom-body">
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
                    <button type="button" onClick={() => handleButtonClick(bodyPart._id)} class="btn btn-primary bg-info btn-custom btn-block"><h2 className="text-white">{bodyPart.name}</h2></button>
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
