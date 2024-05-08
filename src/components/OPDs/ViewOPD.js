import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Card, Spinner } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Img from '../Images/logo.jpg';
import Table from 'react-bootstrap/Table';
import AddPrescription from './AddPrescription';
import { Link } from 'react-router-dom';


function ViewOPD() {

    /// read the id from query parameter of the url 
    const { id } = useParams(); // Access the userId parameter

    const [opdData, setopdData] = useState({

    })

    const [isDataReady, setIsDataReady] = useState(false)

    /// use this id to make api call to server to fetch the incidents

    function getById() {
        fetch("http://localhost:5000/OPDs/" + id, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error("Failed");
            }
            return response.json();
        })
            .then(data => {

                console.log(data);
                if (data.success) {
                    setopdData(data.opd)
                    setIsDataReady(true)
                }
                else {
                    alert(data.message)
                }

            }).catch(error => {
                console.error('Login Error: ', error);
            });
    }

    useEffect(() => { getById() }, [])

    return <>
         
        <Row>
            <Col sm={2}></Col>
            <Col sm={8} style={{ marginTop: 50 }}>
            {/* <Link to={"/incidents/view/"+opdData.incident._id} className="btn btn-secondary" style={{marginBottom:5}}>Back to Incidents</Link> */}
                <Card style={{ backgroundColor: '#F0FFFF' }}>
                    <Card.Header style={{ backgroundColor: "#C0C0C0", fontFamily: 'sans-serif' }}><strong>View OPD Detail</strong></Card.Header>
                    {isDataReady ?
                        <Card.Body>
                            <Row>
                                <Col><p><strong>Doctor : </strong>{opdData.doctor}<br />B.Pharma(Pharmacists)<br />Mob. No.: 9720485986</p></Col>
                                <Col><img src={Img} style={{ height: 70, width: 80, marginTop: 15 }} /></Col>
                                <Col><h5 style={{ color: 'green' }}>Health Care Clinic</h5>Near XYZ, New Delhi<br />223400<br />Timing: 9:00am to 2:00pm|Thursday:Closed</Col>
                            </Row>
                            <p></p>

                            <Row>
                                <Col> <p><strong>Date : </strong> {opdData.date}</p></Col>
                                <Col></Col>
                                <Col> <p><strong>Fees : </strong> {opdData.fees}</p></Col>
                            </Row>

                            <Row>
                                <Col> <p><strong>Patient :</strong>{opdData.incident.patient.name}</p></Col>
                                <Col><p><strong>Age/Gender : </strong> {opdData.incident.patient.age}/{opdData.incident.patient.gender}</p></Col>
                                <Col><p><strong>Mobile : </strong>{opdData.incident.patient.mobile}</p></Col>
                                <Col><p><strong>Status : </strong>{opdData.status}</p></Col>
                            </Row>
                            <Row>
                                <Col><p><strong>Temperature : </strong>{opdData.temp}</p></Col>
                                <Col><p><strong>B.P. : </strong>{opdData.bp}</p></Col>
                                <Col><p><strong>Sugar : </strong>{opdData.sugar}</p></Col>
                                <Col><p><strong>Pulse : </strong>{opdData.pulse}</p></Col>
                            </Row>
                            <Row>
                                <Col><p><strong>CareTaker : </strong>{opdData.incident.patient.careTaker}</p></Col>
                                <Col><p><strong>Address : </strong>{opdData.incident.patient.address}</p></Col>
                            </Row>
                            <p></p>

                            <Row>
                                <Col><p><strong>Diagnosis : </strong>{opdData.incident.diagnosis}</p></Col>
                                <Col><p><strong>Chief-Complaint : </strong>{opdData.incident.chiefComplaint}</p></Col>
                            </Row>
                            <p></p>

                            <br />
                            <AddPrescription opdId={opdData._id} />
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Medicine Name</th>
                                        <th>Dosage</th>
                                        <th>Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>

                            <p><strong>Advice : </strong>{opdData.advice}</p>
                            <p><strong>Allergy : </strong>{opdData.allergy}</p>

                        </Card.Body>
                        : <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                </Card>
            </Col>
            <Col sm="2"></Col>
        </Row>

    </>
}

export default ViewOPD;
