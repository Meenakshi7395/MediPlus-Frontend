import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import DeleteUser from '../components/Users/DeleteUser';
import { useContext } from 'react';
import mediContext from '../context/mediplus/mediContext';

function Users(){

    const {accessToken} = useContext(mediContext)
    
    const [users,setUsers] = useState([])

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    
    const [isDataChange,setIsDataChange] = useState(0);
    
    function dataChange(){
        setIsDataChange(isDataChange+1)
    }
    
    const handleClose = () => setDeleteModalShow(false);
    const handleShow = () => setDeleteModalShow(true);

    const navigate = useNavigate()

    const API_URL = process.env.REACT_APP_BACKEND_API

    function getAllUsers()   
    {
        fetch(`${API_URL}/users`,{
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
                setUsers(data.users)
            }
            else
            {
                alert(data.message)
            }

        }).catch(error=>{
           // console.error('Login Error: ',error);
            navigate('/')
        });
    }
 
    useEffect(()=>{
         getAllUsers();
    },[isDataChange])

    return<>
        <Row style={{paddingTop:30}}> 
            <Col sm={3}></Col>
            <Col sm={6} ><Card  style={{textAlign:'center', fontFamily:'sans-serif' ,backgroundColor:'lightgreen'}} ><h2>User's Detail</h2> </Card></Col>
            <Col sm={3}></Col>
        </Row>
        
        <Container>
        <Row>
            <Col sm={1}></Col>
            <Col sm={10} style={{marginTop:"20px"}}>
                <Link to="/users/add" className="btn btn-info" style={{marginBottom:5}}>Add </Link>
                <Card>
                    <Card.Header style={{backgroundColor:"lightgreen"}}>Your all Detail</Card.Header>
                    <Card.Body style={{backgroundColor:'#F0FFF0'}}>
                    <Table responsive="sm" style={{border:1}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Role</th>
                            <th>About</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {users.map((user,i)=>{

                                return <tr key={"user_"+i}>
                                    <td>{i+1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.role}</td>
                                    <td>{user.about}</td>
                                    <td>
                                        <Link to={"/users/view/"+user._id} className="btn btn-success">View</Link>
                                        <Link to={"/users/edit/"+user._id} className="btn btn-primary" style={{marginLeft:3}}>Edit</Link>
                                        <Button className="btn btn-warning"  style={{marginLeft:3}} onClick={handleShow}>Delete</Button>
                                         <DeleteUser id={user._id} name={user.name} show={deleteModalShow} handleClose={handleClose} onDelete={dataChange}/>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={1}></Col>
        </Row>
        </Container>
    </>
}
export default Users;