import React, { useState } from "react";
import { Modal,Button } from "react-bootstrap";

function DeletePatient(props)
{
    const [msg,setMsg] = useState(`Do you really want to Delete , ${props.name} record?`)
    
    function deletePatient()
    {
            fetch("http://localhost:5000/patients/"+props.id,{
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