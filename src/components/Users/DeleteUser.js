import React, { useState,useContext } from "react";
import { Modal,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import mediContext from "../../context/mediplus/mediContext";
function DeleteUser(props)
{
    const [msg,setMsg] = useState(`Do you really want to Delete , ${props.name} record?`)
    
    const navigate =useNavigate()

    const {accessToken} = useContext(mediContext)
    const API_URL = process.env.REACT_APP_BACKEND_API

    const{onDelete}=props;

    function deleteUser()
    {  
            fetch(`${API_URL}/users/`+props.id,{
                method:'DELETE',
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
                    //alert(data.message)
                    setMsg(`${props.name}, user is deleted!`)
                    onDelete();
                    setTimeout(()=>{
                        props.handleClose()
                    },100)
                }
                else
                {
                 setMsg("User could not be deleted!")
                }

            }).catch(error=>{
               // console.error('Login Error: ',error);
                navigate('/')
            });
        }

    return <>
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{msg} </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={deleteUser}>
                Yes
            </Button>
        </Modal.Footer>
      </Modal>
    </>
}

export default DeleteUser;