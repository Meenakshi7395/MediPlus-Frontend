import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import React, { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DeleteIncident from '../Incidents/DeleteIncidents';


function ViewPatient(){

    /// read the id from path parameter of the url ===> /patients/view/:id
    const {id} = useParams(); // Access the parameters of url

    const [patientData,setPatientData] = useState({
        name: '',
        age:'',  
        gender:'',
        mobile:'',
        address:'',
        careTaker:'',
        incidents:[]
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
                setPatientData(data.patient)
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
          <Card style={{backgroundColor:'#FFF0F5'}}>
          <Card.Header style={{backgroundColor:"#DDA0DD",fontFamily:'sans-serif'}}>View Patient's Detail</Card.Header>
          <Card.Body>
            <Row>
                <Col> <p><strong>Name : </strong>{patientData.name}</p></Col>
                <Col><p><strong>Age : </strong> {patientData.age}</p></Col>
                <Col><p><strong>Gender : </strong>{patientData.gender}</p></Col>
            </Row>
            <Row>
                <Col><p><strong>Mobile : </strong>{patientData.mobile}</p></Col>
                <Col><p><strong>Address : </strong>{patientData.address}</p></Col>
                <Col><p><strong>CareTaker : </strong>{patientData.careTaker}</p></Col>
            </Row>
    </Card.Body>
        </Card>
          </Col>
          <Col sm="1"></Col>
        </Row>

        <Row style={{marginTop:20}}>
            <Col sm={1}></Col>
            <Col sm={10} style={{marginTop:"20px"}}>
                <Link to={"/patients/"} className="btn btn-secondary" style={{marginBottom:5}}>Back</Link>
                <Link to={"/incidents/"+patientData._id+"/"+ patientData.name}className="btn btn-info" style={{marginBottom:5,marginLeft:4}}>Add Incidents </Link>
                <Link to={"/patients/edit/"+patientData._id} className="btn btn-info" style={{marginLeft:4,marginBottom:5}}>Edit Patient's Detail</Link>
                <Card>
                    <Card.Header style={{backgroundColor:"#DDA0DD"}}><strong>Patients Incidents</strong></Card.Header>
                    <Card.Body style={{backgroundColor:'#FFF0F5'}}>
                    <div style={{border:1,height:"280px",overflowY:"scroll"}}>

                    
                    <Table responsive="sm" style={{border:1}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Cheif-Complaint</th>
                            <th>Doctor</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {patientData.incidents.map((incident,i)=>{

                                return <tr key={"patient_"+i}>
                                    <td>{i+1}</td>
                                    <td>{incident.date}</td>
                                    <td>{incident.chiefComplaint}</td>
                                    <td>{incident.doctor}</td>
                                    <td>{incident.status}</td>
                                    <td>
                                        <Link to={"/incidents/view/"+patientData._id} className="btn btn-success" >View</Link>
                                        <Link to={"/incidents/edit/"+patientData._id} className="btn btn-primary"style={{marginLeft:3}} >Edit</Link>
                                        <DeleteIncident id={incident} name={incident.name}/>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </Table>
                    </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={1}></Col>
        </Row>

    </>
}

export default ViewPatient;
