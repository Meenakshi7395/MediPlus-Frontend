import React, { useContext, useState } from "react";
import { Modal, Button, Row, Col, Form, Alert, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import mediContext from '../../context/mediplus/mediContext';


function AddDitails(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {accessToken} = useContext(mediContext)
    const [formData, setFormData] = useState({
        diagnosis : props.diagnosis,
        chiefComplaint : props.chiefComplaint,
        advice:'',
        allergy:'',   
    });

    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState([])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
       // console.log(formData);
    };

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();

        //console.log(formData);
        const API_URL = process.env.REACT_APP_BACKEND_API


        fetch(`${API_URL}/OPDs/` + props.opdId, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${(accessToken)}`,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed");
                }
                return response.json();
            })
            .then(data => {

                //console.log('Form submitted success', data);

                if (data.success) {
                    setErrors([])
                    setMessage("OPD detail updated suucefully");

                    //redirect View incidents page here
                    setTimeout(() => {
                        handleClose();
                    }, 2000)

                }
                else {
                    //console.log(data.errors);
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
        <Button className="btn btn-info" style={{ marginLeft: 3 }} onClick={handleShow}>Update Ditails</Button>

        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add Ditails</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    {message === "" ? <></> : <>
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
                      <strong>Diagnosis :</strong>
                    </Form.Label>
                    <Form.Control as="textarea" name='diagnosis' value={formData.diagnosis}  onChange={handleChange}  />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label >
                      <strong>Chief Complaint :</strong> 
                    </Form.Label>
                    <Form.Control as="textarea" name='chiefComplaint' value={formData.chiefComplaint} onChange={handleChange}  />
                  </Form.Group>
                </Col>
                    </Row>
                    <p></p>

                    <Row>
                      <Col> <Form.Group>
                        <Form.Label >
                        <strong>Advice :</strong>
                          </Form.Label>
                       <Form.Control type="text"  name='advice' placeholder="Advice" onChange={handleChange} />
                       </Form.Group>
                      </Col>

                      <Col>
                          <Form.Group>
                            <Form.Label >
                            <strong>Allergy :</strong>
                              </Form.Label>
                          <Form.Control type="text"  name='allergy' placeholder="Allergy" onChange={handleChange} />
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

export default AddDitails;