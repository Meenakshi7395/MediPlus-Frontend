import React, { useState } from "react";
import { Modal, Button, Row, Col, Form, Alert, } from "react-bootstrap";

function AddPrescription(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [formData, setFormData] = useState({
    medicine: '',
    dosage: '',
    duration: ''
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
          setMessage("Prescription added suucefully");

          //redirect View opd page here
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
    <Button className="btn btn-info" style={{ marginLeft: 3 }} onClick={handleShow}>Add Prescription</Button>
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Prescription </Modal.Title>
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
                  <strong>Medicines :</strong>
                </Form.Label>
                <Form.Control type="text" name='medicine' placeholder="Medicines" onChange={handleChange} />
              </Form.Group>
            </Col>

          </Row>
          <p></p>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label >
                  <strong>Dosage :</strong>
                </Form.Label>
                <Form.Control type="text" name='dosage' placeholder="Dosage" onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label >
                  <strong>Duration :</strong>
                </Form.Label>
                <Form.Control type="number" name='duration' placeholder="Duration" onChange={handleChange} />
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