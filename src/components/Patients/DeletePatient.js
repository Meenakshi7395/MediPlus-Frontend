import React, { useState,useContext } from "react";
import { Modal,Button } from "react-bootstrap";
import mediContext from "../../context/mediplus/mediContext";

function DeletePatient(props)
{
    const [msg,setMsg] = useState(`Do you really want to Delete , ${props.name} record?`)
    const {accessToken} = useContext(mediContext)
    const API_URL = process.env.REACT_APP_BACKEND_API

    function deletePatient()
    {
            fetch(`${API_URL}/patients/`+props.id,{
                method:'DELETE',
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
                    //alert(data.message)
                    setMsg(`${props.name}, patient is deleted!`)
                    setTimeout(()=>{
                        props.handleClose()
                    },2000)
                }
                else
                {
                 setMsg("Patient could not be deleted!")
                }

            }).catch(error=>{
                console.error('Login Error: ',error);
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
            <Button variant="primary" onClick={deletePatient}>
                Yes
            </Button>
        </Modal.Footer>
      </Modal>
    </>
}

export default DeletePatient;