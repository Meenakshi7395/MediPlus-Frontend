import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import DeleteMedicine from '../components/Medicines/DeleteMedicine';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import mediContext from '../context/mediplus/mediContext';

function Medicines(){

    const {accessToken} = useContext(mediContext)
    
    const [medicines,setMedicines] = useState([])

    // const [deleteModalShow, setDeleteModalShow] = useState(false);

    // const handleClose = () => setDeleteModalShow(false);
    // const handleShow = () => setDeleteModalShow(true);

    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_BACKEND_API
    function getAllMedicines()   
    {
        fetch(`${API_URL}/medicines`,{
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
                setMedicines(data.medicines)
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

    useEffect(()=>{
         getAllMedicines();
    },[accessToken])

    return<>
        <Row style={{paddingTop:30}}> 
            <Col sm={3}></Col>
            <Col sm={6} ><Card  style={{textAlign:'center', fontFamily:'sans-serif' ,backgroundColor:'#00BFFF'}} ><h2>All Medicines Detail</h2> </Card></Col>
            <Col sm={3}></Col>
        </Row>
        
        <Container>
        <Row>
            <Col sm={1}></Col>
            <Col sm={10} style={{marginTop:"20px"}}>
                <Link to="/medicines/add" className="btn btn-info" style={{marginBottom:5}}>Add </Link>
                <Card>
                    <Card.Header style={{backgroundColor:"#00BFFF"}}>Medicines Detail</Card.Header>
                    <Card.Body style={{backgroundColor:'#B0E0E6'}}>
                    <Table responsive="sm" style={{border:1}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Brand Name</th>
                            <th>Chemical Name</th>
                            <th>Category</th>
                            {/* <th>Description</th> */}
                            <th>Unit Price</th>
                            {/* <th>Manufecturer</th> */}
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {medicines.map((medicine,i)=>{

                                return <tr key={"medicine_"+i}>
                                    <td>{i+1}</td>
                                    <td>{medicine.brandName}</td>
                                    <td>{medicine.chemicalName}</td>
                                    <td>{medicine.category}</td>
                                    {/* <td>{medicine.description}</td> */}
                                    <td>{medicine.unitPrice}</td>
                                    {/* <td>{medicine.manufecturer}</td> */}
                                    <td>
                                        <Link to={"/medicines/view/"+medicine._id} className="btn btn-success">View</Link>
                                        <Link to={"/medicines/edit/"+medicine._id} className="btn btn-primary" style={{marginLeft:3}}>Edit</Link>
                                        <DeleteMedicine id={medicine._id} brandName={medicine.brandName}/>
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
    </>
}
export default Medicines;