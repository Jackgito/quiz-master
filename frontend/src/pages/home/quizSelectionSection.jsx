import Card from './QuizCard/quizCard.jsx';
import quizCategories from '../../data/quizCategories.json'; // Import the JSON data

const QuizSelectionSection = () => (
  <>
    <div className='quiz-section'>
      <div className="quiz-container">
        {quizCategories.map(category => (
          <div key={category.id}>
            <Card 
              title={category.title} 
              description={category.description}
              image={`/themeIcons/${category.image}`} // Use relative path to public directory
            />
          </div>
        ))}
      </div>
    </div>
  </>
);

export default QuizSelectionSection;