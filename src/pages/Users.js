import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import DeleteUser from '../components/Users/DeleteUser';


function Users(){
    
    const [users,setUsers] = useState([])

    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const handleClose = () => setDeleteModalShow(false);
    const handleShow = () => setDeleteModalShow(true);


    function getAllUsers()   
    {
        fetch("http://localhost:5000/users",{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
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
            console.error('Login Error: ',error);
        });
    }

    useEffect(()=>{
         getAllUsers();
    },[])

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
                <Link to="/users/add" className="btn btn-danger" style={{marginBottom:10}}>Add </Link>
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
                                         <DeleteUser id={user._id} name={user.name} show={deleteModalShow} handleClose={handleClose}/>
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