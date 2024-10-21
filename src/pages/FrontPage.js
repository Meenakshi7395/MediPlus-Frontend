import Img from '../components/Images/frontPage.jpg';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import "./FrontPage.css";
import image2 from '../components/Images/image2.png';
import image3 from '../components/Images/image3.png';
import image4 from '../components/Images/image4.png';
import image5 from '../components/Images/image5.png';
import image6 from '../components/Images/image6.png';
import image7 from '../components/Images/image7.png';
import image8 from '../components/Images/image8.png';
import image9 from '../components/Images/image9.png';
import image10 from '../components/Images/image10.png';
import image11 from '../components/Images/image11.png';
import image12 from '../components/Images/image12.png';
import image13 from '../components/Images/image13.png';
import image from '../components/Images/image.png';

import 'boxicons/css/boxicons.min.css';
import logo from '../components/Images/logo.png';


function FrontPage() {

    const images = [
       image, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13
    ];

    return <>
        <Card>
            <Card.Img src={Img} style={{ height: '92vh' }} alt="Card image" />
            <Card.ImgOverlay>
                <Row>
                    <Col sm={1}></Col>
                    <Col sm={8} style={{ marginTop: 120 }}>
                        <Card.Header style={{ fontWeight: 600, fontSize: 20, color: 'blue', fontFamily: 'sans-serif' }}>WELCOME TO MEDIPLUS</Card.Header>
                        <Card.Body>
                            <Card.Title style={{ fontSize: 70, fontWeight: 700 }}>We are here for your Care</Card.Title>
                            <Card.Text style={{ fontSize: 25, fontFamily: 'sans-serif' }}>
                                A Patient management system with all main features.
                            </Card.Text>
                            <Card.Link href="#features" className="btn btn-primary">Features</Card.Link>
                            <Card.Link href="#about" className="btn btn-primary" style={{ marginLeft: 15 }}>Glimpse</Card.Link>
                            <Card.Link href="#contact" className="btn btn-primary" style={{ marginLeft: 15 }}>Contact</Card.Link>
                            <Link to={"/login"} className="btn btn-success" style={{ marginLeft: 15 }}>Login</Link>
                        </Card.Body>
                    </Col>
                    <Col sm={3}></Col>
                </Row>

            </Card.ImgOverlay>
        </Card>

        <Card id='features'>
            <h2  style={{ fontSize: 30, textAlign: 'center', fontFamily: 'sans-serif', marginTop: 50, fontWeight: 600 }}>FEATURES</h2>

         <div className="card-container" style={{height:'83vh'}}>


                <div className="feature-card">
            <i class='bx bx-plus-medical'></i>
                <h2>Incidents</h2>
                <p>There might be several Incidents of the patient, 
                    there is Option for add, view, edit and delete incident's detail of every patients
                    </p>
            </div>

            <div className="feature-card">
            <i class='bx bx-plus-medical'></i>
                <h2>Patients</h2>
                <p>A Patient can visit the clinic in severaln medical conditions, the Option of managing Incidents
                    groups all the visits for each case of patient.</p>
            </div>
        
           
            
            <div className="feature-card">
            <i class='bx bx-plus-medical'></i>
                <h2>Users</h2>
                <p>In User section only admin can add, edit, delete user's detail.
                    User's name, email, mobile number, and role is added. 
                    </p>
            </div>
            <div className="feature-card">
            <i class='bx bx-plus-medical'></i>
                <h2>OPDs</h2>
                <p>For a given incident there might be several OPDs of the patient,
                    this is possible with our OPD management system which also allows
                    to print the digital prescription in PDF</p>
            </div>
            <div className="feature-card">
            <i class='bx bx-plus-medical'></i>
                <h2>Digital PDF</h2>
                <p>For a given OPDs of the patient,
                    this is possible with our OPD management system which also allows
                    to print the digital prescription in PDF</p>
            </div>
            <div className="feature-card">
            <i class='bx bxs-capsule' ></i>
                <h2>Medicines</h2>
                <p>We also have provided a feature to manage the medicines available
                in the clinic. The same are visible during adding prescriptions.</p>
            </div>
        </div>

        </Card>
       
        <Card  id='about' >
            <h2  style={{ fontSize: 30, textAlign: 'center', fontFamily: 'sans-serif', marginTop: 10, fontWeight: 600 }}>Some Glimpse Of MediPlus</h2>
            <h5 style={{ textAlign: 'center' }}>One Platform for Optimizing Clinic Operations</h5>
            <Slide className="all-slide" duration={2000}>

                {/* {images.map((_,i)=>{
                    return <div className="each-slide-effect"><img src={images[i]}/></div>
                })} */}
                <div className="each-slide-effect"><img src={images[0]}/></div>
                <div className="each-slide-effect"><img src={images[1]}/></div>
                <div className="each-slide-effect"><img src={images[2]}/></div>
                <div className="each-slide-effect"><img src={images[3]}/></div>
                <div className="each-slide-effect"><img src={images[4]}/></div>
                <div className="each-slide-effect"><img src={images[5]}/></div>
                <div className="each-slide-effect"><img src={images[6]}/></div>
                <div className="each-slide-effect"><img src={images[7]}/></div>
                <div className="each-slide-effect"><img src={images[8]}/></div>
                <div className="each-slide-effect"><img src={images[9]}/></div>
                <div className="each-slide-effect"><img src={images[10]}/></div>
                <div className="each-slide-effect"><img src={images[11]}/></div>
                <div className="each-slide-effect"><img src={images[12]}/></div>

            </Slide>
        </Card>

        <Card id='contact'>
            <h2  style={{ fontSize: 30, textAlign: 'center', fontFamily: 'sans-serif', marginTop: 10, fontWeight: 600 }}>Contact-Me</h2> 
            <div className='contact-info'>
                <div>
                   <p>Hello</p>
                </div>
                <div>
                    <h2>Hello</h2>
                </div>
            </div>
        </Card>

            {/* <Card style={{ background: '#00008B' }}>
                <div className='contact'>
                    <div>
                        <p>hello</p>
                    </div>
                    <div>
                        <p>Meenakshi</p>
                    </div>
                </div>
            </Card> */}
        </>
}

export default FrontPage;