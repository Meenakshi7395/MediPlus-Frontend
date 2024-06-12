import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Alert,Card} from 'react-bootstrap';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate,Link } from "react-router-dom";
import { useContext } from 'react';
import mediContext from '../../context/mediplus/mediContext';
import { doctors } from '../PDF/Options';

const status = ['New','Active','Closed','Hold'];

function AddIncident(){

  const { patientId,patientName} = useParams(); // Access the parameters of url
  //console.log(patientName)
  //const [patientName, setPatientName] = useState(patient_name)

  const {accessToken} = useContext(mediContext)

  const[formData,setFormData]=useState({
      patient: patientId,
      date :'', 
      diagnosis :'',
      chiefComplaint :'',
      doctor:'Dr.Himanshu',
      status:'New'
  });

  const [message,setMessage] = useState("")
  const [errors,setErrors] = useState([])

  const navigate = useNavigate()

  const handleChange=(e) =>{
      setFormData({...formData,[e.target.name]:e.target.value});
      //console.log(formData);
  };   

  function handleSubmit(e){
      e.preventDefault();  

      //console.log(formData);

      const API_URL = process.env.REACT_APP_BACKEND_API

      fetch(`${API_URL}/incidents`,{
          method:'POST',
          headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type':'application/json',

        },
          body:JSON.stringify(formData),
      })
    .then(response =>{
      ///console.log(response)
        if(!response.ok){
          throw new Error("Failed");
        }
        return response.json();
    })
    .then(data =>{
       
        //console.log('Form submitted success',data);

      if(data.success){
        setErrors([])
        setMessage("Incidents  added suucefully");

      //redirect View patient page here
       setTimeout(()=>{
        navigate("/patients/view/"+patientId);
       },2000)
        
      }
      else
      {
        //console.log(data.errors);
        setErrors(data.errors)
        setMessage(data.message +"! Please try again")
        
      }
    
})

  .catch(error=>{
      console.error('Error: ',error);
      navigate('/')
  });

    }
    return <>
    <Row>
      <Col sm={2}></Col>
      <Col sm={8} style={{marginTop:50}}>

     {message ==="" ? <></> : <>
      <Alert variant= {errors.length>0 ?"danger" :"success" }>
          {message}
         <ul>
          {errors.map(e=>{
            return <li>{e.path} has {e.msg}</li>
          })}
         </ul>
        </Alert>
     </>}
     
      <Card style={{backgroundColor:'#FFF0F5'}}>
        <Card.Header style={{backgroundColor:"#DDA0DD", fontFamily:'sans-serif'}} >Add Incident</Card.Header>
        <Card.Body>
            <Form className='form' onSubmit={handleSubmit}>

              <Row>
                <Col>
                      <Form.Group  >
                        <Form.Label >
                          <strong>Patient :</strong>
                        </Form.Label>
                        <Form.Control type="text"  name='name' value={patientName} disabled /> 
                      </Form.Group>
                </Col>

                <Col>
                    <Form.Group  >
                        <Form.Label >
                          <strong>Date :</strong>
                        </Form.Label>
                        <Form.Control type="date"  name='date' placeholder="Date"
                         onChange={handleChange} /> 
                      </Form.Group>
                </Col>
              </Row>
              <p></p>

              <Row>
                <Col>
                    <Form.Group>
                    <Form.Label >
                      <strong>Diagnosis :</strong>
                    </Form.Label>
                    <Form.Control as="textarea" name='diagnosis' placeholder='Diagnosis' onChange={handleChange}  />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label >
                      <strong>Chief Complaint :</strong> 
                    </Form.Label>
                    <Form.Control as="textarea" name='chiefComplaint' placeholder="Chief-Complaint" onChange={handleChange}  />
                  </Form.Group>
                </Col>
              </Row>
              <p></p>

              <Row>
                  <Col>
                    <Form.Group >
                      <Form.Label>
                        Doctor :
                      </Form.Label>
                      <Form.Select aria-label="Default select example" name='doctor' onChange={handleChange}>
                        {doctors.map((c) => {
                          return <option value={c.doctor}>{c.doctor}</option>
                        })}
                      </Form.Select>
                    </Form.Group>
                 </Col>

                  <Col>
                  <Form.Group>
                    <Form.Label >
                    <strong>Status :</strong>
                    </Form.Label>
                      <Form.Select aria-label="Default select example" name='status' onChange={handleChange}>
                        {status.map((c)=>{
                            return <option value={c}>{c}</option>
                          })}
                        </Form.Select>
                    </Form.Group>
                  </Col>
              </Row>
              
              <Button variant="success" type='submit' style={{marginTop:10}} >Submit</Button>
              <Link to={"/patients/view/"+patientId} className="btn btn-secondary" style={{marginTop:10,marginLeft:5}}>Back</Link>

              </Form>
        
      </Card.Body>
    </Card>
      </Col>
      <Col sm="2"></Col>
    </Row>
     
     
    </>
}

export default AddIncident;


                    