import React, { useState } from "react";
import { Modal,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DeleteMedicine(props)
{
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const handleClose = () => setDeleteModalShow(false);
    const handleShow = () => setDeleteModalShow(true);

    const [msg,setMsg] = useState(`Do you really want to Delete , ${props.brandName} ?`)
    
    const navigate = useNavigate()

    function deleteMedicine()
    {
            fetch("http://localhost:5000/medicines/"+props.id,{
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
                    setMsg(`${props.brandName}, Medicine is deleted!`)
                    setTimeout(()=>{
                        handleClose()
                    },2000)
                }
                else
                {
                 setMsg("Medicine could not be deleted!")
                }

            }).catch(error=>{
                console.error('Login Error: ',error);
                navigate('/')
            });
        }

    return <>
     <Button className="btn btn-warning"  style={{marginLeft:3}} onClick={handleShow}>Delete</Button>
    <Modal show={deleteModalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{msg} </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={deleteMedicine}>
                Yes
            </Button>
        </Modal.Footer>
      </Modal>
    </>
}

export default DeleteMedicine;