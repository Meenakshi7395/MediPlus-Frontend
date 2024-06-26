import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Alert,Card} from 'react-bootstrap';
import { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import mediContext from '../../context/mediplus/mediContext';
const gender=[
  "male","female"
]
function EditPatient(){
    const {id} = useParams();
    const {accessToken }= useContext(mediContext)
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
     // console.log(formData);
  };
  const API_URL = process.env.REACT_APP_BACKEND_API
  
  function handleSubmit(e){
      e.preventDefault();
      //console.log(formData);

      fetch(`${API_URL}/patients/`+id,{
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
       
        //console.log('Form submitted success',data);

      if(data.success){
        setErrors([])
        setMessage("Patient data Updated suucefully");
        

      //redirect patients page here
       setTimeout(()=>{
        navigate("/patients");
       },2000)
        
      }
      else
      {
       // console.log(data.errors);
        setErrors(data.errors)
        setMessage(data.message +"! Please try again")
        
      }
      // clear form data
    //   setFormData({
    //     name: '',
    //     age:'',  
    //     gender:'',
    //     mobile:'',
    //     address:'',
    //     careTaker:''
    // });
})

  .catch(error=>{
      //console.error('Error: ',error);
      navigate('/')
  });

    }

    function getById()   
    {
        fetch(`${API_URL}/patients/`+id,{
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
            if(data.success)
            {
                setFormData(data.patient)
            }
            else
            {
                alert(data.message)
            }

        }).catch(error=>{
           // console.error('Login Error: ',error);
        });
    }

    useEffect(()=>{getById()},[])
    
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
      <Card.Header style={{backgroundColor:"#DDA0DD" , fontFamily:'sans-serif'}}>Edit Your Details</Card.Header>
      <Card.Body>
       
        <Form className='form' onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Name :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" name='name' value={formData.name} onChange={handleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
          Age :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="number" name='age' value={formData.age} onChange={handleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
        Gender :
        </Form.Label>
        <Col sm="9">
        <Form.Select aria-label="Default select example" name='gender' value={formData.gender} onChange={handleChange}>
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
          <Form.Control type="number"  name='mobile' placeholder="Mob. No." value={formData.mobile} onChange={handleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
        Address :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text"  name='address' placeholder="Address" value={formData.address} onChange={handleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
        CareTaker :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text"  name='careTaker' placeholder="CareTaker" value={formData.careTaker} onChange={handleChange} />
        </Col>
      </Form.Group>

      <Button variant="success" type='submit' >Submit</Button>

      <Link to={"/patients/"} className="btn btn-info" style={{marginLeft:20}}>Patients</Link>

      <Link to={"/patients/view/"+formData._id} className="btn btn-info"  style={{marginLeft:20}}>View</Link>
        </Form>
      </Card.Body>
    </Card>
      </Col>
      <Col sm="2"></Col>
    </Row>
     
     
    </>
}

export default EditPatient;