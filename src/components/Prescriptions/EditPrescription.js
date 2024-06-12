import React, { useState, useEffect,useContext } from "react";
import { Modal, Button, Row, Col, Form, Alert, ModalBody, } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import mediContext from "../../context/mediplus/mediContext";

function EditPrescription(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {accessToken} =useContext(mediContext)
    const [formData, setFormData] = useState({
        opd: props.prescription.opd,
        medicine: props.prescription.medicine._id,
        dosage: props.prescription.dosage,
        duration: props.prescription.duration,
    });

    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState([])

    const [medicines, setMedicines] = useState([])

    const { onEdit } = props

    const navigate = useNavigate()
    const API_URL = process.env.REACT_APP_BACKEND_API

    function getAllMedicines() {
        fetch(`${API_URL}/medicines`, {
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

                if (data.success) {
                    setMedicines(data.medicines)
                }
                else {
                    alert(data.message)
                }

            }).catch(error => {
                //console.error('Login Error: ', error);
                navigate('/')
            });
    }

    useEffect(() => {
        getAllMedicines();
    }, [])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();


        fetch(`${API_URL}/prescriptions/` + props.prescription._id, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed");
                }
               // console.log(response)
                return response.json();
            })
            .then(data => {
                // console.log(data)
                // console.log('Form submitted success', data);

                if (data.success) {
                    setErrors([])
                    setMessage("Prescription updated suucefully");
                    onEdit();
                    setTimeout(() => {
                        setMessage("")
                        handleClose()
                    }, 2000)

                }
                else {
                    // console.log(data.errors);
                    setErrors(data.errors)
                    setMessage(data.message + "! Please try again")

                }

            })

            .catch(error => {
                //console.error('Login Error: ', error);
                navigate('/')
            });
    }  


    return <>
        <Button className="btn btn-info" style={{ marginLeft: 3 }} onClick={handleShow}>Edit</Button>
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Prescription</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {message == "" ? <></> : <>
                        <Alert variant={errors.length > 0 ? "danger" : "success"}>
                            {message}
                            {errors.length > 0 ? <ul>
                                {errors.map(e => {
                                    return <li>{e.path} has {e.msg}</li>
                                })}
                            </ul> : ""}

                        </Alert>
                    </>}
                </Row>
                <Form className='form' onSubmit={handleSubmit}>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label >
                                    <strong>Medicines :</strong>
                                </Form.Label>
                                <Form.Select aria-label="Default select example" name='medicine' value={formData.medicine} onChange={handleChange}>
                                    {medicines.map((m) => {
                                        return <option value={m._id}>{m.chemicalName + " - " + m.brandName + " (" + m.category + ")"}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label >
                                    <strong>Dosage :</strong>
                                </Form.Label>
                                <Form.Control type="text" name='dosage' value={formData.dosage} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label >
                                    <strong>Duration :</strong>
                                </Form.Label>
                                <Form.Control type="number" name='duration' value={formData.duration} onChange={handleChange} />
                            </Form.Group>

                        </Col>

                    </Row>

                    <Modal.Footer>
                        <Button variant="success" type='submit' >Submit</Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    </>
}

export default EditPrescription;