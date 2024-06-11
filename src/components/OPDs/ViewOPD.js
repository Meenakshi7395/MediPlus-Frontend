import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Card, Spinner, Table } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Img from '../Images/logo.png';
import { Link } from 'react-router-dom';
import AddPrescription from '../Prescriptions/AddPrescription';
import DeletePrescription from '../Prescriptions/DeletePreescription';
import EditPrescription from '../Prescriptions/EditPrescription';
import PdfGenerator from '../PDF/PdfGenerator';
import { useContext } from 'react';
import mediContext from '../../context/mediplus/mediContext';
import { doctors } from '../PDF/Options';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
function ViewOPD() {

    /// read the id from query parameter of the url 
    const { id } = useParams(); // Access the userId parameter

    const [opdData, setopdData] = useState({})

    const [isDataReady, setIsDataReady] = useState(false)

    const [isDataChange, setIsDataChange] =useState(0)

    const [doctorInfo,setDoctorInfo] = useState({})
    
    const {accessToken }= useContext(mediContext)
    const navigate = useNavigate()
    const API_URL = process.env.REACT_APP_BACKEND_API

    function dataChange(){
        setIsDataChange((isDataChange) => isDataChange + 1);
    }

    /// use this id to make api call to server to fetch the incidents
    function getById() {
        fetch(`${API_URL}/OPDs/` + id, {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type':'application/json',
    
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

                    // search the doctor in the doctors JSON stored in frontend
                    // const doctorInfo = doctors.filter()

                    // for(var i=0;i<doctors.length;i++)
                    // {
                    //     //console.log(doctors[i])
                    //     //console.log(data.opd.doctor)
                    //     if(doctors[i]["doctor"]===data.opd.doctor)
                    //     {
                    //         setDoctorInfo(doctors[i])
                    //         break;
                    //     }
                    // }


                    // console.log(doctorInfo)
                    //const newdoctor = doctors.filter(item => {item.doctor === opdData.doctor})[0]
                    setDoctorInfo(doctors.filter(item => item.doctor === data.opd.doctor)[0])
                    //     {
                    //         console.log(newdoctor.item)
                    //     }
                    // })
                       
                    
                    setIsDataReady(true)
                }
                else {
                    alert(data.message)
                }

            }).catch(error => {
                console.error('Login Error: ', error);
                navigate('/')
            });
    }



    useEffect(() => { getById() }, [isDataChange])

    return <>
            <Row>
            <Col sm={2}></Col>
            <Col sm={8} style={{ marginTop: 50 }}>
                {/* <Link to={"/incidents/view/"+opdData.incident._id} className="btn btn-secondary" style={{marginBottom:5}}>Back to Incidents</Link> */}
                <PdfGenerator OPD={opdData}/>           
                    <Card style={{ backgroundColor: '#F0FFFF' }}>
                    <Card.Header style={{ backgroundColor: "#C0C0C0", fontFamily: 'sans-serif' }}><strong>View OPD Detail</strong></Card.Header>
                    {isDataReady ?
                        <Card.Body>
                            <Row>
                                <Col><p><strong>Doctor : </strong>{doctorInfo.doctor}<br />{doctorInfo.degree}<br />Mob. No.: 9720485986</p></Col>
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
                            <AddPrescription opdId={opdData._id} onAdd={dataChange} />
                            <Table responsive="sm" style={{ border: 1 }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Medicine</th>
                                        <th>Dosage</th>
                                        <th>Duration</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {opdData.prescriptions.map((prescription, i) => {

                                        return <tr key={+ i}>
                                            <td>{i + 1}</td>
                                            <td>{prescription.medicine.brandName}</td>
                                            <td>{prescription.dosage}</td>
                                            <td>{prescription.duration}</td>
                                            <td>
                                                <EditPrescription prescription={prescription} onEdit={dataChange}/>
                                                <DeletePrescription id={prescription._id} name={prescription.medicine.brandName} onDelete={dataChange}/>
                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                            </Table>

                            <p><strong>Advice : </strong>{opdData.advice}</p>
                            <p><strong>Allergy : </strong>{opdData.allergy}</p>

                            <Link to={"/incidents/view/" + opdData.incident._id} className="btn btn-secondary" style={{ marginBottom: 5 }}>Back to Incidents</Link>
                            
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
