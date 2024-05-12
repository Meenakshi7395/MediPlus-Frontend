import React, { useState, useEffect } from "react";
import { Modal, Button,Row,Col,Form,Alert, } from "react-bootstrap";
import { useNavigate,Link } from "react-router-dom";
function AddPrescription(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        opd: props.opdId,
        medicine:'',
        dosage:'',
        duration:'',
    });

    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState([])

    const [medicines,setMedicines] = useState([])

    const navigate = useNavigate()

    function getAllMedicines() {
        fetch("http://localhost:5000/medicines", {
            method: 'GET',

        }).then(response => {
            if (!response.ok) {
                throw new Error("Failed");
            }
            return response.json();
        })
            .then(data => {

                console.log(data);
                if (data.success) {
                    setMedicines(data.medicines)
                }
                else {
                    alert(data.message)
                }

            }).catch(error => {
                console.error('Login Error: ', error);
            });
    }

    useEffect(() => {
        getAllMedicines();
    }, [])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Hello");

        formData['opd'] = props.opdId
        console.log(formData);

        fetch("http://localhost:5000/prescriptions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error("Failed");
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                console.log('Form submitted success', data);

                if (data.success) {
                    setErrors([])
                    setMessage("Prescription added suucefully");

                    //redirect View incidents page here
                    setTimeout(() => {
                        handleClose()
                        // window.location.reload()            // relaod the same location
                        //navigate('/incidents/view/'+props.incidentId)
                    }, 2000)

                }
                else {
                    console.log(data.errors);
                    setErrors(data.errors)
                    setMessage(data.message + "! Please try again")

                }

            })

            .catch(error => {
                console.error('Error: ', error);
            });
    }


        return <>
            <Button className="btn btn-info" style={{ marginLeft: 3 }} onClick={handleShow}>Add Prescription</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Prescription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        
                        {message =="" ? <></> : <>
                        <Alert variant= {errors.length>0 ?"danger" :"success" }>
                            {message}
                            <ul>
                            {errors.map(e=>{
                                return <li>{e.path} has {e.msg}</li>
                            })}
                            </ul>
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
                                    <Form.Select aria-label="Default select example" name='medicine' onChange={handleChange}>
                                        {medicines.map((m) => {
                                            return <option value={m._id}>{m.chemicalName + " - " + m.brandName + " (" + m.category + ")"}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Label >
                                        <strong>Dosage :</strong>
                                    </Form.Label>
                                    <Form.Control type="text" name='dosage' onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <p></p>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label >
                                        <strong>Duration :</strong>
                                    </Form.Label>
                                    <Form.Control type="number" name='duration'  onChange={handleChange} />
                                </Form.Group>

                            </Col>


                        </Row>

                        <Button variant="success" type='submit' style={{ marginTop: 10 }} >Submit</Button>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                   
                </Modal.Footer>
            </Modal>
        </>
    }

    export default AddPrescription;