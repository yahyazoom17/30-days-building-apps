import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
  onAdd: (activity: string, hours: number, color: string) => void;
}

const TimeForm = ({ onAdd }: Props) => {
  const [activity, setActivity] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const handleSubmit = () => {
    if (!activity.trim() || !hours) {
      alert("Please fill the fields!");
    } else {
      onAdd(activity, Number(hours), color);
      setActivity("");
      setHours("");
    }
  };

  return (
    <div className="space-y-3 mx-auto">
      <Label>Activity:</Label>
      <Input
        className="w-85 md:w-100"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
      <Label>Time Taken (in hours):</Label>
      <Input
        type="number"
        className="w-85 md:w-100"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <div className="flex gap-3">
        <Label>Color:</Label>
        <Input
          type="color"
          className="w-15"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <Button className="w-full" onClick={handleSubmit}>
        Add Activity
      </Button>
    </div>
  );
};

export default TimeForm;
