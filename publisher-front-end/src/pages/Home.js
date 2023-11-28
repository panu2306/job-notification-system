import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="centered">
      <Card className="text-center custom-card">
        <Card.Header>
          <h1>Job Magnet</h1>
        </Card.Header>
        <Card.Body>
          <Card.Title>Connect with Top Talent. Start Posting Today.</Card.Title>
          <Card.Text>
            Unlock the ability to post job opportunities. Join us today!
          </Card.Text>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/register')}
          >
            Register Now
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          &copy; 2023 jobmagnet
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Home;
