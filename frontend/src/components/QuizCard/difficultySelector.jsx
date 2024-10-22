import { RadioGroup, Radio } from 'rsuite';

const DifficultySelector = ({ difficulty, onChange }) => (
  <RadioGroup name="difficulty" inline appearance="picker" value={difficulty} onChange={onChange}>
    <Radio value="easy">Easy</Radio>
    <Radio value="normal">Normal</Radio>
    <Radio value="hard">Hard</Radio>
  </RadioGroup>
);

export default DifficultySelector;