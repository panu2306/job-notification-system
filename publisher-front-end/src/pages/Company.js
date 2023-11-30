import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Company.css'; // Import the external CSS file

const Company = () => {
    const awsURL = "ec2-107-21-197-245.compute-1.amazonaws.com";
    const backendURL = "http://ec2-107-21-197-245.compute-1.amazonaws.com:8080";
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
