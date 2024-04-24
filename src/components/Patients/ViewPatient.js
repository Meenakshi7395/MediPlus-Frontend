import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import React, { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function ViewPatient(){

    /// read the id from query parameter of the url 
    const { id } = useParams(); // Access the userId parameter

    const [patientData,setPatientData] = useState({
        name: '',
        age:'',  
        gender:'',
        mobile:'',
        address:'',
        careTaker:''
    })
  
    /// use this id to make api call to server to fetch the user

    function getById()   
    {
        fetch("http://localhost:5000/patients/"+id,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
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
                setPatientData(data.patients)
            }
            else
            {
                alert(data.message)
            }

        }).catch(error=>{
            console.error('Login Error: ',error);
        });
    }

    useEffect(()=>{getById()},[])
    
    return<>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6} style={{marginTop:50}}>
          <Card style={{backgroundColor:'#FFF0F5'}}>
          <Card.Header style={{backgroundColor:"#DDA0DD",fontFamily:'sans-serif'}}>View Patient's Detail</Card.Header>
          <Card.Body>
            <p><strong>Name : </strong>{patientData.name}</p>
            <p><strong>Age : </strong> {patientData.age}</p>
            <p><strong>Gender : </strong>{patientData.gender}</p>
            <p><strong>Mobile : </strong>{patientData.mobile}</p>
            <p><strong>Address : </strong>{patientData.address}</p>
            <p><strong>CareTaker : </strong>{patientData.address}</p>
            
            <Link to={"/patients/"} className="btn btn-danger">Back</Link>
            <Link to={"/patients/edit/"+patientData._id} className="btn btn-primary" style={{marginLeft:3}}>Edit</Link>
            
          </Card.Body>
        </Card>
          </Col>
          <Col sm="3"></Col>
        </Row>
     
    </>
}

export default ViewPatient;