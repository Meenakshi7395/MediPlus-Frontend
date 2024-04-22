import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Img from '../components/Images/image1.png';

function Login(){

    const[ formData,setFormData]=useState({
        email: '',
        password:''
    });

    const[submitting,setSubmitting]=useState(false);
    const navigate = useNavigate()

    const handleChange=(e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
        console.log(formData);
    };

    function handleSubmit(e){
        e.preventDefault();
        
        //Dispaly submitting msg
        setSubmitting(true );
        
        fetch("http://localhost:5000/users/login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        })
    .then(response =>{
        if(!response.ok){
        throw new Error('Login failed');
        }
        return response.json();
    })

    .then(data =>{

        /*
        sample data
        {
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhpbWFuc2h1MUBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MTI2NTE1NzZ9.QJ4E2WvqWKSpHfHqFI1e_zMbYhwhJgMAQq4dGxOXMks"
        }


        */
        console.log('Login success',data);

        //clear form data
        setFormData({
            email:'',
            password:'',
        });

        //Hide submtting msg
        setSubmitting(false);

        // now save accessToekn in local storage in order to access it in further reuquests to server
        localStorage.setItem("accessToken",data.accessToken)

        //var accessToken = localStorage.getItem("accessToken")

        
        //redirect notes page here
        navigate("/users");

    })

    .catch(error=>{
        console.error('Login Error: ',error);

        //hide submitting msg
        setSubmitting(false);
    });
    

    }
    return <>
    <Row>
      <Col sm={6}><img src={Img} style={{height:"75vh",width:"100%",objectFit:"fill", marginTop:20}} /></Col>
      <Col sm={5} style={{marginTop:80}}>
      <Card style={{backgroundColor:'#F0FFF0'}}>
      <Card.Header style={{backgroundColor:"lightgreen"}}>Login</Card.Header>
      <Card.Body>
        <Form className='form' onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
        Your Email :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="email" name="email" placeholder='email' onChange={handleChange} />
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

  
      <Button variant="success" type="submit" >Login</Button>
        </Form>
        

      </Card.Body>
    </Card>
      </Col>
      <Col sm={1}></Col>
    </Row>
     
    </>
}

export default Login;