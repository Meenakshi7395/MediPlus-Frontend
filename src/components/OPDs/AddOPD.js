import React, { useState } from "react";
import { Modal, Button,Row,Col,Form,Alert, } from "react-bootstrap";
import { useNavigate,Link } from "react-router-dom";
function AddOPD(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        incident: props.incidentId,
        date: '',
        doctor: '',
        fees: '',
        status: "New"
    });

    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Hello");

        formData['incident'] = props.incidentId
        console.log(formData);

        fetch("http://localhost:5000/OPDs", {
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
                    setMessage("OPD data added suucefully");

                    //redirect View incidents page here
                    setTimeout(() => {
                        handleClose()
                        window.location.reload()            // relaod the same location
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
            <Button className="btn btn-info" style={{ marginLeft: 3 }} onClick={handleShow}>Add New OPD</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New OPD</Modal.Title>
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
                                <Form.Group  >
                                    <Form.Label >
                                        <strong>Date :</strong>
                                    </Form.Label>
                                    <Form.Control type="date" name='date' placeholder="Date" onChange={handleChange} />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Label >
                                        <strong>Doctor :</strong>
                                    </Form.Label>
                                    <Form.Control type="text" name='doctor' placeholder="Doctor" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <p></p>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label >
                                        <strong>Fees :</strong>
                                    </Form.Label>
                                    <Form.Control type="number" name='fees' placeholder="Fees" onChange={handleChange} />
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

    export default AddOPD;