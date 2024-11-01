import { RadioGroup, Radio } from 'rsuite';

const DifficultySelector = ({ onChange }) => (
  <RadioGroup name="difficulty" inline appearance="picker" defaultValue="Normal" onChange={onChange}>
    <Radio value="Easy">Easy</Radio>
    <Radio value="Normal">Normal</Radio>
    <Radio value="Hard">Hard</Radio>
  </RadioGroup>
);

export default DifficultySelector;