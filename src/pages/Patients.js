import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import DeletePatient from '../components/Patients/DeletePatient';
import { useNavigate } from 'react-router-dom';
import mediContext from '../context/mediplus/mediContext';
import { Spinner } from 'react-bootstrap';

function Patients(){

    const {accessToken} = useContext(mediContext)
    
    const [patients,setPatients] = useState([])

    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const [isDataChange, setIsDataChange]= useState(0);

    const [isDataReady, setIsDataReady] = useState(false);

    function dataChange(){
        setIsDataChange(isDataChange+1)
    }
    const handleClose = () => setDeleteModalShow(false);
    const handleShow = () => setDeleteModalShow(true);

    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_BACKEND_API
    function getAllPatients()   
    {
        fetch(`${API_URL}/patients`,{
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
           
            if(data.success)
            {
                setPatients(data.patients)
                setIsDataReady(true)
            }
            else
            {
                alert(data.message)
            }

        }).catch(error=>{
           // console.error('Login Error: ',error);
            navigate('/');
            console.log("nevigate")
        });
    }

    useEffect(()=>{
         getAllPatients(); 
    }, [isDataChange])

    return<>
        <Row style={{paddingTop:30}}> 
            <Col sm={3}></Col>
            <Col sm={6} ><Card  style={{textAlign:'center', fontFamily:'sans-serif' ,backgroundColor:'#DDA0DD'}} ><h2>Patients Detail</h2> </Card></Col>
            <Col sm={3}></Col>
        </Row>
        {isDataReady ?
        <Container>
        <Row>
            <Col sm={1}></Col>
            <Col sm={10} style={{marginTop:"20px"}}>
                <Link to="/patients/add" className="btn btn-info" style={{marginBottom:5}}>Add </Link>
                <Card>
                    <Card.Header style={{backgroundColor:"#DDA0DD"}}>Your all Detail</Card.Header>
                    <Card.Body style={{backgroundColor:'#FFF0F5'}}>
                    <Table responsive="sm" style={{border:1}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>CareTaker</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient,i)=>{

                                return <tr key={"patient_"+i}>
                                    <td>{i+1}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.mobile}</td>
                                    <td>{patient.address}</td>
                                    <td>{patient.careTaker}</td>
                                    <td>
                                        <Link to={"/patients/view/"+patient._id} className="btn btn-success">View</Link>
                                        <Link to={"/patients/edit/"+patient._id} className="btn btn-primary" style={{marginLeft:3}}>Edit</Link>
                                        <Button className="btn btn-warning"  style={{marginLeft:3}} onClick={handleShow}>Delete</Button>
                                         <DeletePatient id={patient._id} name={patient.name} show={deleteModalShow} handleClose={handleClose} onDelete={dataChange}/>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={1}></Col>
        </Row>
        </Container>
        :<div style={{marginLeft:100}}><Button variant="primary" disabled>
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
        <span className="visually-hidden">Loading...</span>
      </Button>{' '}
      <Button variant="primary" disabled>
        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"
        />
        Loading...
      </Button>
      </div>}
    </>
}
export default Patients;