import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import React, { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddOPD from '../OPDs/AddOPD';
import AddVitals from '../OPDs/AddVitals';
import AddDitails from '../OPDs/AddDetails';


function ViewIncident(){

    /// read the id from query parameter of the url 
    const { id } = useParams(); // Access the userId parameter

    const [incidentData,setIncidentData] = useState({
      patient:{},
      date :'', 
      diagnosis :'',
      chiefComplaint :'',
      doctor:'',
      status:'',
      OPDs: []
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
          </Card.Body>
        </Card>
          </Col>
          <Col sm="1"></Col>
        </Row>

        <Row style={{marginTop:20}}>
            <Col sm={1}></Col>
            <Col sm={10} style={{marginTop:"20px"}}>
                <Link to={"/patients/view/"+incidentData.patient._id} className="btn btn-secondary" style={{marginBottom:5}}>Back to Incidents</Link>
                {/* <Link to={"/OPDs/"+incidentData._id+"/"+ incidentData.patient.name } className="btn btn-info" style={{marginBottom:5,marginLeft:4}}>Add OPDs </Link> */}
                <AddOPD incidentId = {incidentData._id} />
                <Link to={"/incidents/edit/"+incidentData._id} className="btn btn-info" style={{marginLeft:4,marginBottom:5}}>Edit Incident's Detail</Link>
                <Card>
                    <Card.Header style={{backgroundColor:"#DDA0DD"}}><strong>Incidents OPD</strong></Card.Header>
                    <Card.Body style={{backgroundColor:'#FFF0F5'}}>
                    <div style={{border:1,height:"280px",overflowY:"scroll"}}>

                    <Table responsive="sm" style={{border:1}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Cheif-Complaint</th>
                            <th>Status</th>
                            <th>Doctor</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {incidentData.OPDs.reverse().map((opd,i)=>{

                                return <tr key={"incident_"+i}>
                                    <td>{i+1}</td>
                                    <td>{opd.date}</td>
                                    <td>{opd.chiefComplaint}</td>
                                    <td>{opd.status}</td>
                                    <td>{opd.doctor}</td>
                                    <td>
                                        <Link to={"/OPDs/view/"+opd._id} className="btn btn-success" >View</Link>
                                        <AddVitals opdId = {opd._id}/>
                                        <AddDitails opdId={opd._id} diagnosis={opd.diagnosis} chiefComplaint={opd.chiefComplaint} />
                                        {/* <Link to={"/OPDs/edit/"+opd._id} className="btn btn-primary" style={{marginLeft:3}} ></Link> */}
                                        {/* <DeleteOPD id={opd._id} /> */}
                                        {/* <AddVitals id={opd._id} name={patientData.name}/> */}
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

export default ViewIncident;
