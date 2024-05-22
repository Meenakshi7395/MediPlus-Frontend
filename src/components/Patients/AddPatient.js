import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Alert,Card} from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function AddPatient(){
  
  const gender=[
    "male","female"
  ]

  const[formData,setFormData]=useState({
      name: '',
      age:'',  
      gender:'',
      mobile:'',
      address:'',
      careTaker:''
  });

  const [message,setMessage] = useState("")
  const [errors,setErrors] = useState([])

  const navigate = useNavigate()

  const handleChange=(e) =>{
      setFormData({...formData,[e.target.name]:e.target.value});
      console.log(formData);
  };

  function handleSubmit(e){
      e.preventDefault();
      console.log("Hello");

      console.log(formData);

      fetch("http://localhost:5000/patients",{
          method:'POST',
          headers:{
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type':'application/json',

        },
          body:JSON.stringify(formData),
      })
    .then(response =>{
      console.log(response)
        if(!response.ok){
          throw new Error("Failed");
        }
        return response.json();
    })
    .then(data =>{
       
        console.log('Form submitted success',data);

      if(data.success){
        setErrors([])
        setMessage("Patient added suucefully");

      //redirect patients page here
       setTimeout(()=>{
        navigate("/patients");
       },2000)
        
      }
      else
      {
        console.log(data.errors);
        setErrors(data.errors)
        setMessage(data.message +"! Please try again")
        
      }
      // clear form data
    //   setFormData({
    //       name:'',
    //       age:'',
    //       gender:'',
    //       mobile:'',
    //       address:'',
    //       careTaker:''
    // });
})

  .catch(error=>{
      console.error('Error: ',error);
      navigate("/")      //nevigate to the login page 
  });

    }
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
     
      <Card style={{backgroundColor:'#FFF0F5'}}>
      <Card.Header style={{backgroundColor:"#DDA0DD", fontFamily:'sans-serif'}} >Patient's Detail</Card.Header>
      <Card.Body>
        <Form className='form' onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
        Name :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" name='name' placeholder='name' onChange={handleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
        Age :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="number" name='age' placeholder="Age" onChange={handleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
        Gender :
        </Form.Label>
        <Col sm="9">
        <Form.Select aria-label="Default select example" name='gender' onChange={handleChange}>
        {gender.map((c)=>{
            return <option value={c}>{c}</option>
          })}
        </Form.Select>
        </Col>
      </Form.Group>

     <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
        Mobile :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="number"  name='mobile' placeholder="Mob. No." onChange={handleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
        Address :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text"  name='address' placeholder="Address" onChange={handleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
        CareTaker :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text"  name='careTaker' placeholder="CareTaker" onChange={handleChange} />
        </Col>
      </Form.Group>

      <Button variant="success" type='submit' >Submit</Button>
      <Link to="/patients" className="btn btn-secondary" style={{marginLeft:5}}>Back</Link>
        </Form>
        
      </Card.Body>
    </Card>
      </Col>
      <Col sm="2"></Col>
    </Row>
     
     
    </>
}

export default AddPatient;