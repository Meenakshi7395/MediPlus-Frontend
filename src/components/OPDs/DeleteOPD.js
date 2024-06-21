import React, { useState,useContext } from "react";
import { Modal,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import mediContext from "../../context/mediplus/mediContext";

function DeleteOPD(props)
{

    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const handleClose = () => setDeleteModalShow(false);
    const handleShow = () => setDeleteModalShow(true);

    const navigate=useNavigate()
    
    const {onDelete}=props;
    
    const [msg,setMsg] = useState(`Do you really want to Delete, ${props.name}'s OPD data added on ${props.date}'?`)
    
    const API_URL = process.env.REACT_APP_BACKEND_API

    const {accessToken} = useContext(mediContext)

    function deleteOPD()
    {
            fetch(`${API_URL}/OPDs/`+props.id,{
                method:'DELETE',
                headers:{
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type':'application/json',
        
                },                                        
            }).then(response =>{
                console.log(response);
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
                    setMsg(`${props.name}' OPD data of ${props.date}, is deleted!`)
                    onDelete();
                    setTimeout(()=>{
                        handleClose()
                    },100)
                }
                else
                {
                 setMsg("OPD data could not be deleted!")
                }

            }).catch(error=>{
                //console.error('Login Error: ',error);
                navigate('/')
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
            <Button variant="primary" onClick={deleteOPD}>
                Yes
            </Button>
        </Modal.Footer>  
      </Modal>
    </>
}

export default DeleteOPD;