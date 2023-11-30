import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import './Jobs.css'; // Import your CSS file for styling

const Jobs = () => {
  const subURL = "http://ec2-54-175-11-5.compute-1.amazonaws.com:8083";
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(subURL + 'jobs');
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const timer = setInterval(() => {
      fetchData();
    }, 3000);

    fetchData();
    return () => clearInterval(timer);
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="jobs-container">
      <h1>Job Listings</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Description</th>
            <th>Apply</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.jobId}>
              <td>{job.jobId}</td>
              <td>{job.jobTitle}</td>
              <td>{job.companyName}</td>
              <td>{job.jobLocation}</td>
              <td>{job.description}</td>
              <td>
                <Button
                  variant="dark"
                  className="apply-button"
                  onClick={() => handleApplyClick(job)}
                >
                  Apply
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Job Details */}
      <Modal show={selectedJob !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <div>
              <h4>{selectedJob.jobTitle}</h4>
              <p>Company: {selectedJob.companyName}</p>
              <p>Location: {selectedJob.jobLocation}</p>
              <p>Description: {selectedJob.description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Jobs;
