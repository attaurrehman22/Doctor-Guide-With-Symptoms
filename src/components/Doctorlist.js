
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
const Doctorlist=()=>{
    const[symptoms,setSymptoms]=useState([])
    const location=useLocation();
    const selectedsymptoms=location.state?.selectedsymptoms;


    useEffect(() => {
        fetch(`http://localhost:5000/getdoctorlist/${selectedsymptoms}`)  
          .then(response => response.json())
          .then(data => setSymptoms(data))
          .catch(error => console.error('Error fetching symptoms:', error));
      }, [selectedsymptoms]);

      useEffect(()=>{
        console.log("------",symptoms)
      },[symptoms])


    return(
        <h2>align</h2>
    )
}
export default Doctorlist;