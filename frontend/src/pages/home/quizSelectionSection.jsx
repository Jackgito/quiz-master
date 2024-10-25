import { Row, Col } from 'rsuite';
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

const QuizSelectionSection = () => (
  <>
    <div className="quiz-section">
      <Row className="card-row">
        {quizCategories.map(category => (
          <Col key={category.id} md={6} sm={12} className="card-col">
            <Card 
              title={category.title} 
              description={category.description} 
              image={imageMap[category.image]}
            />
          </Col>
        ))}
      </Row>
    </div>
  </>
);

export default QuizSelectionSection;
