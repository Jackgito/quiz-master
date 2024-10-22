import { Panel } from 'rsuite';

const QuizCard = ({ title, description, image }) => (
  <Panel bodyFill bordered header={title}>
    <img src={image} alt={title} style={{ width: '100%', height: 'auto' }} />
    <p>{description}</p>
  </Panel>
);

export default QuizCard;