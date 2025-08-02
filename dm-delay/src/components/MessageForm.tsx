import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const MessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const [delay, setDelay] = useState<number>(0);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [sentMessage, setSentMessage] = useState<string>("");

  const handleSend = () => {
    setIsSending(true);
    const id = setTimeout(() => {
      setSentMessage(message);
      setMessage("");
      setIsSending(false);
    }, delay * 1000);

    setTimerId(id);
  };

  const handleCancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      setSentMessage("");
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 rounded-lg shadow-sm bg-white space-y-4 border md:max-w-md">
      <h2 className=" text-2xl font-bold text-gray-800">DM Delay Button</h2>
      <Textarea
        className="w-80 h-30 md:w-100"
        placeholder="Type your message..."
        value={message}
        disabled={isSending}
        onChange={(e) => {
          setMessage(e.target.value);
          setSentMessage("");
        }}
      />
      <div className="flex flex-col justify-between my-5 md:flex-row">
        <Button
          disabled={isSending}
          className="w-20"
          onClick={() => {
            setDelay(Number(10));
          }}
        >
          10s
        </Button>
        <Button
          className="w-20"
          disabled={isSending}
          onClick={() => {
            setDelay(Number(30));
          }}
        >
          30s
        </Button>
        <Button
          className="w-20"
          disabled={isSending}
          onClick={() => {
            setDelay(Number(60));
          }}
        >
          60s
        </Button>
      </div>
      <Label className="mx-auto">Custom delay:</Label>
      <Input
        value={delay}
        placeholder={`${delay}`}
        onChange={(e) => {
          setDelay(Number(e.target.value));
        }}
      />
      {!isSending ? (
        <Button className="w-full" onClick={handleSend}>
          Send Message
        </Button>
      ) : (
        <Button
          className="w-full"
          onClick={handleCancel}
          variant={"destructive"}
        >
          Cancel Sending
        </Button>
      )}

      {sentMessage && (
        <div className="bg-green-100 border rounded p-3 text-green-900">
          <p className="font-semibold">Message Sent Successfully!</p>
          <p>{sentMessage}</p>
        </div>
      )}
    </div>
  );
};

export default MessageForm;
