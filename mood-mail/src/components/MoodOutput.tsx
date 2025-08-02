import { Clipboard } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
  subject: string;
  footer: string;
  onReset: () => void;
  onCopy: { handleSubjectCopy: () => void; handleFooterCopy: () => void };
  copyText: { subjectCopyText: string; footerCopyText: string };
};

const MoodOutput = ({ subject, footer, onReset, onCopy, copyText }: Props) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="block font-medium my-2 mx-auto">Subject:</Label>
        <div className="flex items-center justify-between gap-2">
          <Input className="w-80 md:w-100" value={subject} readOnly />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                className="cursor-pointer"
                onClick={onCopy.handleSubjectCopy}
              >
                <Clipboard />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copyText.subjectCopyText}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div>
        <Label className="block font-medium my-2 mx-auto">
          Footer Signature:
        </Label>
        <div className="flex items-center justify-between gap-2">
          <Textarea className="w-80 md:w-100" value={footer} readOnly />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                onClick={onCopy.handleFooterCopy}
                className="cursor-pointer"
              >
                <Clipboard />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copyText.footerCopyText}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div>
        <Button onClick={onReset} variant={"destructive"} className="w-full">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default MoodOutput;
