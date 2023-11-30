import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
  const awsURL = "ec2-107-21-197-245.compute-1.amazonaws.com";
  const publisherURL = "http://ec2-107-21-197-245.compute-1.amazonaws.com:8080";
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [showError, setShowError] = useState(false);
  const [show, setShow] = useState(false);


  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
        const url = publisherURL + '/add/publisher';
        const companyDetails = { name: formData.name }; 

        axios.post(url, companyDetails).then((response) => {
            console.log(response.data);
            if (response.status === 200) {
                console.log("Company name send to backend successfully");
                const queryString = new URLSearchParams(formData).toString();
                history(`/company?${queryString}`);
            } else if (response.status === 400 || response.status === 404) {
                console.log("Publisher not found");
            } else if (response.status === 500) {
                console.log("Publisher is not reachable");
            }
          }).catch(err => {
            console.log(err);
            setShow(true);
          });
    };

  return (
    <>
      <div className="centered">
        <Card className="text-center custom-card">
          <Card.Header>
            <h1>Register Your Company</h1>
          </Card.Header>
          <Card.Body>
            <Alert show={showError} variant="danger">
              <p>Something went wrong during registration. Please try again.</p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-danger">
                  Close
                </Button>
              </div>
            </Alert>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                <Form.Label column sm="3" className="text-right font-weight-bold">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your company name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formEmail">
                <Form.Label column sm="3" className="text-right font-weight-bold">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Button variant="success" type="submit">
                Register
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">
            &copy; {new Date().getFullYear()} Job Magnet
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default Register;

