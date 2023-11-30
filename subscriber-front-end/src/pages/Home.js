import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './Home.css'; // Import your CSS file for styling

const Home = () => {
  const brokerURL = 'http://ec2-54-175-11-5.compute-1.amazonaws.com:8083';
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const url = brokerURL + '/get/topics';

    try {
      const response = await axios.get(url);
      const topics = Object.values(response.data);

      const searchParams = new URLSearchParams();
      searchParams.append('list', topics.join(',')); // Join topics into a comma-separated string

      history({
        pathname: '/subscribe',
        search: searchParams.toString(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="centered">
      <Card className="home-card">
        <Card.Header>
          <h1>Job Magnet</h1>
        </Card.Header>
        <Card.Body>
          <Card.Title>
          Job Opportunities at Your Fingertips: One Platform, Infinite Possibilities
          </Card.Title>
          <Card.Text>
          Your Personal Job Concierge: Sign Up Today for Easy Notifications
          </Card.Text>
          <Button
            variant="primary"
            size="lg"
            onClick={handleClick}
            className="home-button"
          >
            Enroll here
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
