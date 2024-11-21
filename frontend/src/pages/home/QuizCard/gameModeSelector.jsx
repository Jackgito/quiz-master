import { RadioGroup, Radio } from 'rsuite';
import { useQuizSettings } from '../../../context/quizSettingsContext';

const GamemodeSelector = () => {
  const { settings, setSettings } = useQuizSettings();

  const handleGamemodeChange = (value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      gamemode: value,
    }));
  };

  return (
    <RadioGroup
      name="gamemode"
      inline
      appearance="picker"
      defaultValue={settings.gamemode}
      onChange={handleGamemodeChange}
    >
      <Radio value="singleplayer">Singleplayer</Radio>
      <Radio value="multiplayer" disabled>Multiplayer</Radio>
      <Radio value="private" disabled>Private</Radio>
    </RadioGroup>
  );
};

export default GamemodeSelector;