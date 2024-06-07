import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import React, { useState,useEffect,useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DeleteMedicine from '../Medicines/DeleteMedicine';
import mediContext from '../../context/mediplus/mediContext';


function ViewMedicine(){

    /// read the id from query parameter of the url 
    const { id } = useParams(); // Access the userId parameter

    const [medicineData,setMedicineData] = useState({
        brandName: '',
        chemicalName:'',  
        category:'',
        description:'',
        unitPrice:'',
        manufecturer:''
    })

    const navigate = useNavigate()
    const {accessToken} = useContext(mediContext)
    /// use this id to make api call to server to fetch the user
    const API_URL = process.env.REACT_APP_BACKEND_API

    function getById()   
    {
        fetch(`${API_URL}/medicines/${id}`,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type':'application/json',
    
            },                                         
        }).then(response =>{
            if(!response.ok){
              throw new Error("Failed");
            }
            return response.json();
        })
        .then(data =>{
           
            console.log(data);
            if(data.success)
            {
                setMedicineData(data.medicine)
            }
            else
            {
                alert(data.message)
            }

        }).catch(error=>{
            console.error('Login Error: ',error);
            navigate('/')
        });
    }

    useEffect(()=>{getById()},[])
    
    return<>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6} style={{marginTop:50}}>
          <Card style={{backgroundColor:'#B0E0E6'}}>
          <Card.Header style={{backgroundColor:"#00BFFF",fontFamily:'sans-serif'}}>View Medicine's Detail</Card.Header>
          <Card.Body>
            <p><strong>Brand Name : </strong>{medicineData.brandName}</p>
            <p><strong>Chemical Name : </strong> {medicineData.chemicalName}</p>
            <p><strong>category : </strong>{medicineData.category}</p>
            <p><strong>Description : </strong>{medicineData.description}</p>
            <p><strong>Unit Price : </strong>{medicineData.unitPrice}</p>
            <p><strong>Manufecturer : </strong>{medicineData.manufecturer}</p>
            
            <Link to={"/medicines/"} className="btn btn-secondary">Back</Link>
            <Link to={"/medicines/edit/"+medicineData._id} className="btn btn-info" style={{marginLeft:3}}>Edit</Link>
            <DeleteMedicine id={medicineData._id} brandName={medicineData.brandName}/>
          </Card.Body>
        </Card>
          </Col>
          <Col sm="3"></Col>
        </Row>
     
    </>
}

export default ViewMedicine;
