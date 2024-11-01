import { RadioGroup, Radio } from 'rsuite';

const GameModeSelector = ({ onChange }) => (
  <RadioGroup name="gameMode" inline appearance="picker" defaultValue="singleplayer" onChange={onChange}>
    <Radio value="singleplayer">Singleplayer</Radio>
    <Radio value="multiplayer" disabled>Multiplayer</Radio>
    <Radio value="private" disabled>Private</Radio>
  </RadioGroup>
);

export default GameModeSelector;