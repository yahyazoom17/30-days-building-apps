import MoodInput from "@/components/MoodInput";
import MoodOutput from "@/components/MoodOutput";
import { useState } from "react";

function Home() {
  const [mood, setMood] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [footer, setFooter] = useState<string>("");
  const [generated, setGenerated] = useState<boolean>(false);
  const [subjectCopyText, setSubjectCopyText] =
    useState<string>("Copy to clipboard");
  const [footerCopyText, setFooterCopyText] =
    useState<string>("Copy to clipboard");

  const currentDate = new Date();

  const handleGenerate = () => {
    const lowerMood = mood.toLowerCase();
    if (lowerMood.includes("happy")) {
      setSubject("Feeling Great Today!😇 " + `(${currentDate.toDateString()})`);
      setFooter("Stay awesome✨");
    } else if (lowerMood.includes("sad")) {
      setSubject(
        "Just Another Tough Day!😔 " + `(${currentDate.toDateString()})`
      );
      setFooter("Sending hugs🫂");
    } else if (lowerMood.includes("angry")) {
      setSubject("Need To Cool Of!😡 " + `(${currentDate.toDateString()})`);
      setFooter("Deep breaths😮‍💨");
    } else if (lowerMood.includes("good")) {
      setSubject("Good Keep Coding!😁 " + `(${currentDate.toDateString()})`);
      setFooter("Stay Consistent🏃‍♂️");
    } else {
      setSubject("Mood Update!🔁 " + `(${currentDate.toDateString()})`);
      setFooter("Catch you later👋");
    }
    setGenerated(true);
  };

  const handleReset = () => {
    setMood("");
    setSubject("");
    setFooter("");
    setGenerated(false);
    setSubjectCopyText("Copy to clipboard");
    setFooterCopyText("Copy to clipboard");
  };

  const handleSubjectCopy = () => {
    navigator.clipboard.writeText(subject);
    setSubjectCopyText("Subject Copied!");
  };

  const handleFooterCopy = () => {
    navigator.clipboard.writeText(footer);
    setFooterCopyText("Footer Copied!");
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 rounded-lg shadow-sm bg-white space-y-6 md:max-w-lg">
      <h2 className="text-2xl font-bold text-gray-800">MoodMail Generator</h2>

      {!generated ? (
        <MoodInput
          mood={mood}
          setMood={setMood}
          onGenerate={handleGenerate}
          disabled={generated}
        />
      ) : (
        <MoodOutput
          subject={subject}
          footer={footer}
          onReset={handleReset}
          onCopy={{ handleSubjectCopy, handleFooterCopy }}
          copyText={{ subjectCopyText, footerCopyText }}
        />
      )}
    </div>
  );
}

export default Home;
