import { useState } from 'react';
import { Panel } from 'rsuite';
import QuizModal from '../../../components/QuizModal/quizModal.jsx';
import './quizCard.css';

const QuizCard = ({ title, description, image }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Panel bodyFill bordered header={title} onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <img src={image} alt={title} style={{ width: '100%', height: 'auto' }} />
      </Panel>

      <QuizModal
        open={open}
        onClose={handleClose}
        title={title}
        description={description}
      />
    </>
  );
};

export default QuizCard;