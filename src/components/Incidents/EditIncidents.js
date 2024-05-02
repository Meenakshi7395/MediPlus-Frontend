import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Alert,Card} from 'react-bootstrap';
import { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const status = ['Open','Closed','Hold'];

function EditIncident(){
    const { patient_id } = useParams();

  const[formData,setFormData]=useState({
    patient: patient_id,
    date :'', 
    chiefComplaint :'',
    diagnosis :'',
    doctor:'',
    status:''
  });

  const [message,setMessage] = useState("")
  const [errors,setErrors] = useState([])

  const navigate = useNavigate()

  const handleChange=(e) =>{
      setFormData({...formData,[e.target.name]:e.target.value});
     // console.log(formData);
  };

  function handleSubmit(e){
      e.preventDefault();
      console.log(formData);

      fetch("http://localhost:5000/incidents/"+patient_id,{
          method:'PATCH',
          headers:{
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type':'application/json',

        },
          body:JSON.stringify(formData),
      })
    .then(response =>{
       // console.log(response)
        if(!response.ok){
          throw new Error("Failed");
        }
        return response.json();
    })
    .then(data =>{
       
        console.log('Form submitted success',data);

      if(data.success){
        setErrors([])
        setMessage("Incident  data Updated suucefully");
        

      //redirect medicines page here
       setTimeout(()=>{
        navigate("/incidents/"+patient_id);
       },2000)
        
      }
      else
      {
        console.log(data.errors);
        setErrors(data.errors)
        setMessage(data.message +"! Please try again")
        
      }

})

  .catch(error=>{
      console.error('Error: ',error);
    
  });

    }

    function getById()   
    {
        fetch("http://localhost:5000/incidents/"+patient_id,{
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
                setFormData(data.incidents)
            }
            else
            {
                alert(data.message)
            }

        }).catch(error=>{
            console.error('Login Error: ',error);
        });
    }

    useEffect(()=>{getById()},[])
    
    return <>
    <Row>
      <Col sm={2}></Col>
      <Col sm={8} style={{marginTop:50}}>

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
     
      <Card style={{backgroundColor:'#B0E0E6'}}>
      <Card.Header style={{backgroundColor:"#00BFFF" , fontFamily:'sans-serif'}}>Edit Incident's Detail</Card.Header>
      <Card.Body>
            <Form className='form' onSubmit={handleSubmit}>

              <Row>
                <Col><p><strong>Patient's Name :</strong>{}</p></Col>
                <Col></Col>
              </Row>

              <Row>
                <Col>
                    <Form.Group as={Row} className="mb-2" >
                    <Form.Label >
                      <strong>Diagnosis :</strong>
                    </Form.Label>
                      <textarea  name='diagonosis' placeholder="Diagnosis" onChange={handleChange}  ></textarea>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Row} className="mb-2">
                    <Form.Label >
                      <strong>ChiefComplaint :</strong> 
                    </Form.Label>
                      <textarea  name='complatint' placeholder="Chief-Complaint" onChange={handleChange} style={{marginLeft:5} } ></textarea>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                  <Col>
                  <Form.Group>
                  <Form.Label >
                  <strong>Doctor :</strong>
                    </Form.Label>
                       <Form.Control type="text"  name='name' placeholder="Doctor" onChange={handleChange} />
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
              <Link to={"/incidents/view/"+patient_id} className="btn btn-secondary" style={{marginTop:10,marginLeft:5}}>Back</Link>

              </Form>
        
      </Card.Body>
    </Card>
      </Col>
      <Col sm="2"></Col>
    </Row>
     
     
    </>
}

export default EditIncident;