import { RadioGroup, Radio } from 'rsuite';

const GameModeSelector = ({ onChange }) => (
  <RadioGroup name="gameMode" inline appearance="picker" defaultValue="multiplayer" onChange={onChange}>
    <Radio value="solo">Solo</Radio>
    <Radio value="multiplayer">Multiplayer</Radio>
    <Radio value="private" disabled>Private</Radio>
  </RadioGroup>
);

export default GameModeSelector;