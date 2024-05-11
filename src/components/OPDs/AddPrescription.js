import React, { useState,useEffect } from "react";
import { Modal, Button, Row, Col, Form, Alert,Table } from "react-bootstrap";
import DeletePrescription from "./DeletePrescription";
import EditPrescription from "./EditPrescription";

function AddPrescription(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    opd:props.opdId,
    medicine: '',
    dosage: '',
    duration: ''
  });

  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState([])

  const [medicines,setMedicines] = useState([])

  const [prescriptions,setPrescriptions] = useState(props.currentPrescriptions)   // set an empty array 

   // Function to add new prescription data to the prescriptions
   const addPrescription = (prescription) => {
    setPrescriptions([...prescriptions, prescription]);  // Add new prescription to the existing prescription data
  };

    const removePrescription = (prescription) => {

     const temp = []
     for(var i=0;i<prescriptions.length;i++)
      {
        if(prescriptions[i]._id != prescription._id)
          temp.push(prescriptions[i])
      }

      setPrescriptions(temp)
      console.log(prescription._id+" deleted")
    };
  
    //setPrescriptions([...prescriptions, prescription]);  // Add new prescription to the existing prescription data
    
  
  
  
  function getAllMedicines()   
  {
      fetch("http://localhost:5000/medicines",{
          method:'GET',
                                                      
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
      });
    }
  
    useEffect(()=>{
      getAllMedicines();
 },[])



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Hello");

    console.log(formData);

    fetch("http://localhost:5000/prescriptions/", {
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

        console.log('Form submitted success', data);

        if (data.success) {
          setErrors([])
          setMessage("Prescription added suucefully");

          // add the newly created prescription to the prescriptions
          addPrescription(data.prescription)

          //redirect View opd page here
          setTimeout(() => {
            setMessage("");
            handleClose();
          }, 2000)

        }
        else {
          console.log(data.errors);
          setErrors(data.errors)
          setMessage(data.message + "! Please try again")

        }
       // clear form data
      setFormData({
        opd:props.opdId,
        medicine: '',
        dosage: '',
        duration: ''
    });

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
                <Form.Select aria-label="Default select example" name='medicine' onChange={handleChange}>
                    {medicines.map((m)=>{
                        return <option value={m._id}>{m.chemicalName+" - "+m.brandName + " ("+m.category+")"}</option>
                    })}
                </Form.Select>
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
                <Form.Control type="text" name='dosage'  onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label >
                  <strong>Duration :</strong>
                </Form.Label>
                <Form.Control type="number" name='duration' onChange={handleChange} />
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

    <Table responsive="sm" style={{ border: 1 }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Medicine Name</th>
          <th>Dosage</th>
          <th>Duration</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {prescriptions.map((prescription, i) => {
          return <tr key={i}>
            <td>{i + 1}</td>
            <td>{prescription.medicine.brandName}</td>
            <td>{prescription.dosage}</td>
            <td>{prescription.duration}</td>
            <td>
            <EditPrescription id={prescription._id } prescriptions={prescriptions}/>
            <DeletePrescription id={prescription._id} name={prescription.medicine.brandName} onDelete={removePrescription}/>
            </td>

          </tr>
        })}
      </tbody>
    </Table>
</>
}
export default AddPrescription;