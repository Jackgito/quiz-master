import { RadioGroup, Radio } from 'rsuite';
import { useQuizSettings } from '../../../context/quizSettingsContext';

const DifficultySelector = () => {
  const { settings, setSettings } = useQuizSettings();

  const handleDifficultyChange = (value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      difficulty: value,
    }));
  };

  return (
    <RadioGroup
      name="difficulty"
      inline
      appearance="picker"
      defaultValue={settings.difficulty}
      onChange={handleDifficultyChange}
    >
      <Radio value="Easy">Easy</Radio>
      <Radio value="Normal">Normal</Radio>
      <Radio value="Hard">Hard</Radio>
    </RadioGroup>
  );
};

export default DifficultySelector;