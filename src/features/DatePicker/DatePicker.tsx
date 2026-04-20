import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePicker() {
    const [date, setDate] = useState<Date | undefined>(new Date(new Date().getFullYear(), 0, 20));

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-center px-3 font-normal bg-white hover:bg-smoky-white max-w-[20%] cursor-pointer"
                >
                    <CalendarIcon className="mr-2 size-4" />
                    {date ? (
                        format(date, "LLL dd, y")
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    defaultMonth={date}
                    numberOfMonths={2}
                    className="rounded-md border shadow-lg"
                />
            </PopoverContent>
        </Popover>
    );
}
