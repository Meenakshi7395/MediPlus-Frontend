import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Alert,Card} from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function AddUser(){
  
  const roles=[
    "admin","maneger","staff"
  ]

  const[formData,setFormData]=useState({
      name: '',
      email:'',  
      password:'',
      mobile:'',
      role:'',
      about:''
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
      const accessToken = localStorage.getItem("accessToken")

      fetch("http://localhost:5000/users",{
          method:'POST',
          headers:{
              'Authorization': `Bearer ${accessToken}`,
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
        setMessage("Data created suucefully");
        //alert("Data created suucefully");

      //redirect notes page here
       setTimeout(()=>{
        navigate("/users");
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
    //       email:'',
    //       password:'',
    //       mobile:'',
    //       role:'',
    //       about:''
    // });
})

  .catch(error=>{
      console.error('Error: ',error);
     // navigate("/login")
  
     
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
     
      <Card style={{backgroundColor:'#F0FFF0'}}>
      <Card.Header style={{backgroundColor:"lightgreen", fontFamily:'sans-serif'}} >User's Detail</Card.Header>
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
        Email :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="email" name='email' placeholder="Email" onChange={handleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
        Password :
        </Form.Label>
        <Col sm="9">
        <Form.Control type="password" name='password' placeholder="Password" onChange={handleChange} />
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
         Role :
        </Form.Label>
        <Col sm="9">
        <Form.Select aria-label="Default select example" name='role' onChange={handleChange}>
        {roles.map((c)=>{
            return <option value={c}>{c}</option>
          })}
        </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
            About :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text"  name='about' placeholder="About" onChange={handleChange} />
        </Col>
      </Form.Group>

      <Button variant="success" type='submit' >Submit</Button>
        </Form>
        
      </Card.Body>
    </Card>
      </Col>
      <Col sm="2"></Col>
    </Row>
     
     
    </>
}

export default AddUser;