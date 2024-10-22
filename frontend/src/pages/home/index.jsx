import { useState } from "react"; 
import { Row, Col } from 'rsuite';
import Navbar from '../../components/Navbar';
import Card from '../../components/QuizCard';
import quizCategories from '../../data/quizCategories.json'; // Import the JSON data

// Import images directly
import scienceIcon from '../../assets/scienceIcon.png';
import randomIcon from '../../assets/randomIcon.png';
import musicIcon from '../../assets/musicIcon.png';

// Create an object to map image filenames to their imports
const imageMap = {
  "scienceIcon.png": scienceIcon,
  "randomIcon.png": randomIcon,
  "musicIcon.png": musicIcon,
};

// Import CSS styles
import './Home.css'; 

function Home() {
  const [activeTab, setActiveTab] = useState('home'); 

  return (
    <>
      <Navbar active={activeTab} onSelect={setActiveTab} />
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Welcome to Quiz Master</h1>
      <div className="home-container">
        <Row className="card-row">
          {quizCategories.map(category => (
            <Col key={category.id} md={6} sm={12} className="card-col">
              <Card 
                title={category.title} 
                description={category.description} 
                image={imageMap[category.image]} // Use the mapped image
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Home;
