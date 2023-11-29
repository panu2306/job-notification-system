import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Company.css'; // Import the external CSS file

const Company = () => {
    const awsURL = "localhost";
    const backendURL = "http://localhost:8080";
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    const email = queryParams.get('email');

    const [jobFormData, setFormData] = useState({
        id: '',
        title: '',
        location: '',
        description: '',
        company: name
    });

    const [show, setShow] = useState(false);
    const [showDangerAlert, setDangerShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading indicator

    const handleChange = (e) => {
        setFormData({ ...jobFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true); // Show loading indicator
        console.log(jobFormData);

        const url = backendURL + '/publish/jobs';
        const jobDetails = {
            jobId: jobFormData.id,
            jobTitle: jobFormData.title,
            companyName: jobFormData.company,
            jobLocation: jobFormData.location,
            description: jobFormData.description
        };

        axios.post(url, jobDetails)
            .then((response) => {
                setIsLoading(false); // Hide loading indicator
                console.log(response.data);
                if (response.status === 200) {
                    setShow(true); // Show success alert
                } else if (response.status === 400) {
                    setDangerShow(true); // Show error alert
                }
            })
            .catch((err) => {
                setIsLoading(false); // Hide loading indicator
                console.error(err);
                setDangerShow(true); // Show error alert
            });
            jobFormData.id = '';
            jobFormData.title = '';
            jobFormData.location = '';
            jobFormData.description = '';
    };

    return (
        <div className="centered-add-job">
            <Card className="text-center">
                <Card.Header>Add New Job</Card.Header>
                <Card.Body>
                    <Card.Title>Admin Email: {email}</Card.Title>
                    <Alert show={show} variant="success">
                        <p>The new job for the company {name} has been published.</p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setShow(false)} variant="outline-success">
                                Close
                            </Button>
                        </div>
                    </Alert>
                    <Alert show={showDangerAlert} variant="danger">
                        <p>Something went wrong while publishing new job!</p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setDangerShow(false)} variant="outline-danger">
                                Close
                            </Button>
                        </div>
                    </Alert>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextID">
                            <Form.Label column sm="3">
                                Job ID
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    name="id"
                                    value={jobFormData.id}
                                    onChange={handleChange}
                                    required // Form validation
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextTitle">
                            <Form.Label column sm="3">
                                Job Title
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={jobFormData.title}
                                    onChange={handleChange}
                                    required // Form validation
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextLocation">
                            <Form.Label column sm="3">
                                Location
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    name="location"
                                    value={jobFormData.location}
                                    onChange={handleChange}
                                    required // Form validation
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextDescription">
                            <Form.Label column sm="3">
                                Info
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    name="description"
                                    value={jobFormData.description}
                                    onChange={handleChange}
                                    required // Form validation
                                />
                            </Col>
                        </Form.Group>
                        <Button variant="success" type="submit" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Add'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Company;

// import React from 'react';
// import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
// import axios from 'axios';

// const Company = () => {
//     //const awsURL = "ec2-54-164-130-60.compute-1.amazonaws.com";
//     //const backendURL = "http://" + awsURL + ":8080";
//     const awsURL = "localhost";
//     const backendURL = "http://localhost:8080";
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const name = queryParams.get('name');
//     const email = queryParams.get('email');

//     const [jobFormData, setFormData] = useState({
//         id: '',
//         title: '',
//         location: '',
//         description: '',
//         company: name
//     });

//     const [show, setShow] = useState(false);
//     const [showDangerAlert, setDangerShow] = useState(false);

//     const handleChange = (e) => {
//         setFormData({ ...jobFormData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(jobFormData);

//         const url = backendURL + '/publish/jobs';
//         const jobDetails = { 
//             jobId: jobFormData.id,
//             jobTitle: jobFormData.title,
//             companyName: jobFormData.company,
//             jobLocation: jobFormData.location,
//             description: jobFormData.description
//          };

//         axios.post(url, jobDetails).then((response) => {
//             console.log(response.data);
//             if (response.status === 200) {
//                 console.log("Job details send to broker successfully");
//             } else if (response.status === 400) {
//                 console.log("Publisher not found");
//             } else if (response.status === 500) {
//                 console.log("Publisher is not reachable");
//             }
//           }).catch(err => {
//             console.log(err);
//             setDangerShow(true);
//           });

//         jobFormData.id = '';
//         jobFormData.title = '';
//         jobFormData.location = '';
//         jobFormData.description = '';
//     };

//     return (
//         <>
//             <div className="centered-add-job">
//                 <Card className="text-center">
//                     <Card.Header>Add New Job</Card.Header>
//                     <Card.Body>
//                         <Card.Title>Signed in as: {email}</Card.Title>
//                         <Alert show={show} variant="success">
//                             <p>The new job for the company {name} has been published.</p>
//                             <hr />
//                             <div className="d-flex justify-content-end">
//                                 <Button onClick={() => setShow(false)} variant="outline-success">Close</Button>
//                             </div>
//                         </Alert>
//                         <Alert show={showDangerAlert} variant="danger">
//                             <p>Something went wrong while publishing new job!</p>
//                             <hr />
//                             <div className="d-flex justify-content-end">
//                                 <Button onClick={() => setDangerShow(false)} variant="outline-danger">Close</Button>
//                             </div>
//                         </Alert>
//                         <Form onSubmit={handleSubmit}>
//                             <Form.Group as={Row} className="mb-3" controlId="formPlaintextID">
//                                 <Form.Label column sm="2">ID</Form.Label>
//                                 <Col sm="10">
//                                     <Form.Control type="text" name="id" value={jobFormData.id} onChange={handleChange} />
//                                 </Col>
//                             </Form.Group>
//                             <Form.Group as={Row} className="mb-3" controlId="formPlaintextTitle">
//                                 <Form.Label column sm="2">Title</Form.Label>
//                                 <Col sm="10">
//                                     <Form.Control type="text" name="title" value={jobFormData.title} onChange={handleChange} />
//                                 </Col>
//                             </Form.Group>
//                             <Form.Group as={Row} className="mb-3" controlId="formPlaintextLocation">
//                                 <Form.Label column sm="2">Location</Form.Label>
//                                 <Col sm="10">
//                                     <Form.Control type="text" name="location" value={jobFormData.location} onChange={handleChange} />
//                                 </Col>
//                             </Form.Group>
//                             <Form.Group as={Row} className="mb-3" controlId="formPlaintextDescription">
//                                 <Form.Label column sm="2">Description</Form.Label>
//                                 <Col sm="10">
//                                     <Form.Control as="textarea" rows={6} name="description" value={jobFormData.description} onChange={handleChange} />
//                                 </Col>
//                             </Form.Group>
//                             <Button variant="success" type="submit">Add</Button>
//                         </Form>
//                     </Card.Body>
//                     <Card.Footer className="text-muted">(c) Ruchi | Ann | Prachi</Card.Footer>
//                 </Card>
//             </div>
//         </>
//     );
// }

// export default Company;