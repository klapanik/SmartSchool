import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageSquareText } from "lucide-react";

export function GradeComment({ comment }: { comment: string }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="text-primary cursor-pointer duration-200 hover:text-primary/70 my-auto">
                    <MessageSquareText size={17} />
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>{comment}</p>
            </TooltipContent>
        </Tooltip>
    );
}
