import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Alert,Card} from 'react-bootstrap';
import { useState ,useEffect,useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import mediContext from '../../context/mediplus/mediContext';

const status = ['Open','Closed','Hold'];

function EditIncident(){
    const {id } = useParams();
   const {accessToken} = useContext(mediContext)
  const[formData,setFormData]=useState({
    patient:'',
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

  const API_URL = process.env.REACT_APP_BACKEND_API

  function handleSubmit(e){
      e.preventDefault();
      console.log(formData);
      
    fetch(`${API_URL}/incidents/`+id,{
          method:'PATCH',
          headers:{
            'Authorization': `Bearer ${accessToken}`,
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
        navigate("/patients/view/"+formData.patient._id);
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
        fetch(`${API_URL}/incidents/`+id,{
            method:'GET',
            headers:{
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type':'application/json',
  
          },
                                                        
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
                setFormData(data.incident)
            }
            else
            {
                alert(data.message)
            }

        }).catch(error=>{
            console.error('Login Error: ',error);
            navigate('/')
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
                <Col>
                      <Form.Group  >
                        <Form.Label >
                          <strong>Patient :</strong>
                        </Form.Label>
                        <Form.Control type="text"  name='name' value={formData.patient.name} onChange={handleChange} /> 
                      </Form.Group>
                </Col>

                <Col>
                    <Form.Group  >
                        <Form.Label >
                          <strong>Date :</strong>
                        </Form.Label>
                        <Form.Control type="date"  name='date' value={formData.date}  onChange={handleChange} /> 
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
                    <Form.Control as="textarea" name='diagnosis' value={formData.diagnosis} onChange={handleChange}  />
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
                  <Col>
                  <Form.Group>
                  <Form.Label >
                  <strong>Doctor :</strong>
                    </Form.Label>
                       <Form.Control type="text"  name='doctor' value={formData.doctor} onChange={handleChange} />
                       </Form.Group>
                 </Col>

                  <Col>
                  <Form.Group>
                    <Form.Label >
                    <strong>Status :</strong>
                    </Form.Label>
                      <Form.Select aria-label="Default select example" name='status' value={formData.status} onChange={handleChange}>
                        {status.map((c)=>{
                            return <option value={c}>{c}</option>
                          })}
                        </Form.Select>
                    </Form.Group>
                  </Col>
              </Row>
              
              <Button variant="success" type='submit' style={{marginTop:10}} >Submit</Button>
              <Link to={"/patients/view/"+formData.patient._id} className="btn btn-secondary" style={{marginTop:10,marginLeft:5}}>Back</Link>

              </Form>
        
      </Card.Body>
    </Card>
      </Col>
      <Col sm="2"></Col>
    </Row>
     
     
    </>
}

export default EditIncident;