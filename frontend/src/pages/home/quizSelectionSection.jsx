import Card from '../../components/QuizCard';
import quizCategories from '../../data/quizCategories.json'; // Import the JSON data

// Import images directly
import scienceIcon from '../../assets/scienceIcon.png';
import randomIcon from '../../assets/randomIcon.png';
import musicIcon from '../../assets/musicIcon.png';
import gamingIcon from '../../assets/gamingIcon.jpg';
import geographyIcon from '../../assets/geographyIcon.jpg';
import sportsIcon from '../../assets/sportsIcon.jpg';

// Create an object to map image filenames to their imports
const imageMap = {
  "scienceIcon.png": scienceIcon,
  "randomIcon.png": randomIcon,
  "musicIcon.png": musicIcon,
  "gamingIcon.jpg": gamingIcon,
  "geographyIcon.jpg": geographyIcon,
  "sportsIcon.jpg": sportsIcon,
};

const QuizSelectionSection = () => (
  <>
  <div className='quiz-section'>
    <div className="quiz-container">
      {quizCategories.map(category => (
        <div key={category.id}>
          <Card 
            title={category.title} 
            description={category.description}
            image={imageMap[category.image]}
          />
        </div>
      ))}
    </div>
  </div>
  </>
);


export default QuizSelectionSection;