import TimeChart from "@/components/TimeChart";
import TimeForm from "@/components/TimeForm";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState<
    { activity: string; hours: number; color: string }[]
  >([]);
  const [totalHours, setTotalHours] = useState<number>(0);

  setInterval(() => {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("totalHours", totalHours.toString());
  }, 1000);

  const handleAdd = (activity: string, hours: number, color: string) => {
    setData((prev) => [...prev, { activity, hours, color }]);
    setTotalHours((prev) => hours + prev);
  };

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("data") || "[]"));
    setTotalHours(Number(localStorage.getItem("totalHours") || 0));
  }, []);

  return (
    <div className="max-w-sm mx-auto p-6 mt-20 bg-white rounded-lg shadow-sm space-y-6 md:max-w-fit">
      <h1 className="text-2xl font-bold">⏱️ Time Tracker</h1>
      <div className="flex flex-col space-x-5 md:flex-row items-center">
        <TimeForm onAdd={handleAdd} />
        {data.length ? (
          <div className="space-x-5 mt-8 ml-5">
            <div className="space-y-5">
              <Label>Total Hours Tracked: {totalHours + `hrs`}</Label>
              {totalHours > 12 && (
                <Label className="text-yellow-500">
                  Warning: Tracking more than 12hrs!
                </Label>
              )}
              <TimeChart data={data} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
