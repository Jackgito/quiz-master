
// Later this will display multiplayer scores with profile pictures
const ScoreDisplay = ({ score, totalQuestions, onPlayAgain }) => {

  return (
    <div className="score-display">
      <h2>Score: {score}</h2>
    </div>
  );
}

export default ScoreDisplay;