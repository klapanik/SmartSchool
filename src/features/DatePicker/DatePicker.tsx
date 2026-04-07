import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePicker() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(new Date().getFullYear(), 0, 20),
        to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
    });

    return (
        <Field
            className="w-full max-w-sm mx-auto rounded-lg border bg-card p-4 flex justify-between transition-all duration-500 cursor-pointer
                shadow-[0_4px_20px_-2px_#7c3aed3f] hover:shadow-[0_4px_20px_-2px_#7c3aed88] flex-col @lg:flex-row"
        >
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date-picker-range"
                        className="w-full justify-start px-3 font-normal text-left"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        className="rounded-md border shadow-lg"
                    />
                </PopoverContent>
            </Popover>
        </Field>
    );
}
