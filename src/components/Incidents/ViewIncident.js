import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import React, { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DeleteIncident from './DeleteIncidents';


function ViewIncident(){

    /// read the id from query parameter of the url 
    const { id } = useParams(); // Access the userId parameter

    const [incidentData,setIncidentData] = useState({
      patient:{},
      date :'', 
      diagnosis :'',
      chiefComplaint :'',
      doctor:'',
      status:''
    })
  
    /// use this id to make api call to server to fetch the incidents

    function getById()   
    {
        fetch("http://localhost:5000/incidents/"+id,{
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
                setIncidentData(data.incident)
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
          <Col sm={1}></Col>
          <Col sm={10} style={{marginTop:50}}>
          <Card style={{backgroundColor:'#B0E0E6'}}>
          <Card.Header style={{backgroundColor:"#00BFFF",fontFamily:'sans-serif'}}><strong>View Incident's Detail</strong></Card.Header>
          <Card.Body>
            <p><strong>Date : </strong> {incidentData.date}</p>
            <Row>
                <Col> <p><strong>Patient's Name : </strong>{incidentData.patient.name}</p></Col>
                <Col><p><strong>Age/Gender : </strong> {incidentData.patient.age}/{incidentData.patient.gender}</p></Col>
                <Col><p><strong>Doctor : </strong>{incidentData.doctor}</p></Col>
            </Row>
            <Row>
                <Col><p><strong>Address : </strong>{incidentData.patient.address}</p></Col>
                <Col><p><strong>Mobile : </strong>{incidentData.patient.mobile}</p></Col>
                <Col><p><strong>CareTaker : </strong>{incidentData.patient.careTaker}</p></Col>
            </Row>
            <Row>
                <Col><p><strong>Status : </strong>{incidentData.status}</p></Col>
                <Col><p><strong>Diagnosis : </strong>{incidentData.diagnosis}</p></Col>
                <Col><p><strong>Chief-Complaint : </strong>{incidentData.chiefComplaint}</p></Col>
            </Row>
                
            <Link to={"/patients/view/"+incidentData.patient._id} className="btn btn-secondary" >Back</Link>
            <DeleteIncident id={incidentData._id} />
          </Card.Body>
        </Card>
          </Col>
          <Col sm="1"></Col>
        </Row>
     
    </>
}

export default ViewIncident;
