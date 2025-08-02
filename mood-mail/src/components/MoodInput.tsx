import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
  mood: string;
  setMood: (val: string) => void;
  onGenerate: () => void;
  disabled: boolean;
};

const MoodInput = ({ mood, setMood, onGenerate, disabled }: Props) => {
  return (
    <div className="space-y-4">
      <Input
        className="w-80 md:w-100"
        placeholder="How are you feeling today?"
        value={mood}
        onChange={(e) => {
          setMood(e.target.value);
        }}
        disabled={disabled}
      />
      <Button className="w-full" onClick={onGenerate} disabled={disabled}>
        Generate Email Template
      </Button>
    </div>
  );
};

export default MoodInput;
