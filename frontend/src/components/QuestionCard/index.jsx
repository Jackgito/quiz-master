import { useState } from 'react';
import { Panel } from 'rsuite';
import './index.css';

const QuestionCard = ({ question, image }) => {

  return (
    <>
      <Panel bodyFill bordered header={question} onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <img src={image} alt={question} style={{ width: '100%', height: 'auto' }} />
      </Panel>
    </>
  );
};

export default QuestionCard;