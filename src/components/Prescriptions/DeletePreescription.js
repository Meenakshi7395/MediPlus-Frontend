import React, { useState } from "react";
import { Modal,Button } from "react-bootstrap";

function DeletePrescription(props)
{
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const handleClose = () => setDeleteModalShow(false);
    const handleShow = () => setDeleteModalShow(true);

    const{onDelete} = props
                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    const [msg,setMsg] = useState(`Do you really want to Delete , ${props.name}' prescription ?`)
    
    function deletePrescription()
    {
            fetch("http://localhost:5000/prescriptions/"+props.id,{
                method:'DELETE',
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
                    //alert(data.message)
                    setMsg(`${props.name}' prescription deleted!`)
                    onDelete()
                    setTimeout(()=>{
                        handleClose()
                    },100)
                }
                else
                {
                 setMsg("Incident could not be deleted!")
                }

            }).catch(error=>{
                console.error('Login Error: ',error);
            });
        }

    return <>
     <Button className="btn btn-warning"  style={{marginLeft:3}}onClick={handleShow}>Delete</Button>
    <Modal show={deleteModalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{msg} </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={deletePrescription}>
                Yes
            </Button>
        </Modal.Footer>
      </Modal>
    </>
}

export default DeletePrescription;