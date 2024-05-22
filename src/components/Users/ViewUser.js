import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function ViewUser(){

    /// read the id from query parameter of the url 
    const { id } = useParams(); // Access the userId parameter

    const [userData,setUserData] = useState({
        name: '',
        email:'',  
        password:'',
        mobile:'',
        role:'',
        about:''
    })
  
    const navigate=useNavigate()
    /// use this id to make api call to server to fetch the user

    function getById()   
    {
        fetch("http://localhost:5000/users/"+id,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
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
                setUserData(data.users)
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
    
    return<>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6} style={{marginTop:50}}>
          <Card style={{backgroundColor:'#F0FFF0'}}>
          <Card.Header style={{backgroundColor:"lightgreen",fontFamily:'sans-serif'}}>View your Note</Card.Header>
          <Card.Body>
            <p><strong>Name : </strong>{userData.name}</p>
            <p><strong>Email : </strong> {userData.email}</p>
            <p><strong>Mobile : </strong>{userData.mobile}</p>
            <p><strong>Role : </strong>{userData.role}</p>
            <p><strong>About : </strong>{userData.about}</p>
            
            <Link to={"/users/"} className="btn btn-secondary">Back</Link>
            <Link to={"/users/edit/"+userData._id} className="btn btn-info" style={{marginLeft:3}}>Edit</Link>
            
          </Card.Body>
        </Card>
          </Col>
          <Col sm="3"></Col>
        </Row>
     
    </>
}

export default ViewUser;
