import React, { useState,useContext } from "react";
import { Modal,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import mediContext from "../../context/mediplus/mediContext";
function DeleteMedicine(props)
{
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const {accessToken} = useContext(mediContext)
    const handleClose = () => setDeleteModalShow(false);
    const handleShow = () => setDeleteModalShow(true);

    const [msg,setMsg] = useState(`Do you really want to Delete , ${props.brandName} ?`)
    
    const navigate = useNavigate()

    const API_URL = process.env.REACT_APP_BACKEND_API

    const {onDelete}=props;
    function deleteMedicine()
    {
            fetch(`${API_URL}/medicines/`+props.id,{
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
            
                //console.log(data);
               if(data.success)
                {
                    //alert(data.message)
                    setMsg(`${props.brandName}, Medicine is deleted!`)
                    onDelete();
                    setTimeout(()=>{
                        handleClose()
                    },100)
                }
                else
                {
                 setMsg("Medicine could not be deleted!")
                }

            }).catch(error=>{
               // console.error('Login Error: ',error);
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