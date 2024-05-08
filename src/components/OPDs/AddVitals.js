import React, { useState } from "react";
import { Modal, Button, Row, Col, Form, Alert, } from "react-bootstrap";
import { useParams } from 'react-router-dom';

function AddVitals(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [formData, setFormData] = useState({
        temp: '',
        bp: '',
        sugar: '',
        pulse: '',
    });

    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState([])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Hello");

        console.log(formData);

        fetch("http://localhost:5000/OPDs/" + props.opdId, {
            method: 'PATCH',
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

                console.log('Form submitted success', data);

                if (data.success) {
                    setErrors([])
                    setMessage("OPD data added suucefully");

                    //redirect View incidents page here
                    setTimeout(() => {
                        handleClose();
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
        <Button className="btn btn-info" style={{ marginLeft: 3 }} onClick={handleShow}>Add Vitals</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Vitals</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    {message == "" ? <></> : <>
                        <Alert variant={errors.length > 0 ? "danger" : "success"}>
                            {message}
                            <ul>
                                {errors.map(e => {
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
                                    <strong>Temp. :</strong>
                                </Form.Label>
                                <Form.Control type="number" name='temp' placeholder="Temprature" onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label >
                                    <strong>B.P. :</strong>
                                </Form.Label>
                                <Form.Control type="number" name='bp' placeholder="Blood Pressure" onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <p></p>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label >
                                    <strong>Sugar :</strong>
                                </Form.Label>
                                <Form.Control type="number" name='sugar' placeholder="Sugar" onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label >
                                    <strong>Pulse :</strong>
                                </Form.Label>
                                <Form.Control type="number" name='pulse' placeholder="Pulse" onChange={handleChange} />
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

export default AddVitals;