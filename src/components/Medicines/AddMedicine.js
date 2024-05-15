import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Alert,Card} from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { medicineCategoryData } from '../PDF/Options';
function AddMedicine(){
  
  const category=['Tablet','Capsule','Injection','Syrup','Drop','Ointmet']

  const[formData,setFormData]=useState({
      brandName: '',
      chemicalName:'',  
      category:'Tablet',
      description:'',
      unitPrice:'',
      manufecturer:''
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

      fetch("http://localhost:5000/medicines",{
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
        setMessage("Medicine added suucefully");

      //redirect Medicines page here
       setTimeout(()=>{
        navigate("/medicines");
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
    //       brandName:'',
    //       chemicalName:'',
    //       category:'',
    //       description:'',
    //       unitPrice:'',
    //       manufecturer:''
    // });
})

  .catch(error=>{
      console.error('Error: ',error);
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
     
      <Card style={{backgroundColor:'#B0E0E6'}}>
      <Card.Header style={{backgroundColor:"#00BFFF", fontFamily:'sans-serif'}} >Medicine's Detail</Card.Header>
      <Card.Body>
        <Form className='form' onSubmit={handleSubmit}>
        <Row>
            <Col>
                <Form.Group >
                    <Form.Label >
                        Brand Name :
                    </Form.Label>
                <Form.Control type="text" name='brandName' placeholder='brand Name' onChange={handleChange} />
                </Form.Group>
            </Col>

            <Col>
               <Form.Group>
                   <Form.Label>
                        Chemical Name :
                    </Form.Label>
               <Form.Control type="text" name='chemicalName' placeholder="chemicalName" onChange={handleChange} />
               </Form.Group>
            </Col>
      </Row>
      <p></p>
      <Row>
        <Col>
            <Form.Group >
                <Form.Label>
                    Category :
                </Form.Label>
                <Form.Select aria-label="Default select example" name='category' onChange={handleChange}>
                    {medicineCategoryData.map((c)=>{
                        return <option value={c.abbr}>{c.description}</option>
                    })}
                </Form.Select>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group >
                <Form.Label column sm="3">
                    Description :
                </Form.Label>
                <Form.Control type="text"  name='description' placeholder="Description" onChange={handleChange} />
        
             </Form.Group>
        </Col>
      </Row>
      <p></p>
      <Row>
            <Col>
                <Form.Group  >
                    <Form.Label >
                        Unit Price :
                    </Form.Label>
                   <Form.Control type="number"  name='unitPrice' placeholder="Unit Price" onChange={handleChange} />
               </Form.Group>
           </Col>

            <Col>
                <Form.Group >
                    <Form.Label >
                        Manufecturer :
                    </Form.Label>
                    <Form.Control type="text"  name='manufecturer' placeholder="Manufecturer" onChange={handleChange} />
                </Form.Group>
            </Col>
      </Row>
      
      <p></p>
      <Button variant="success" type='submit'>Submit</Button>
      <Link to="/medicines" className='btn btn-secondary' style={{marginLeft:5}}>Back</Link>
        </Form>
        
      </Card.Body>
    </Card>
      </Col>
      <Col sm="2"></Col>
    </Row>
    
     </>
}

export default AddMedicine;