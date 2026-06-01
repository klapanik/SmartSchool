import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

export function DatePicker() {
    const [date, setDate] = useState<Date | undefined>();
    const isMobile = useIsMobile();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full sm:w-fit lg:min-w-44 justify-start lg:justify-center px-3 font-normal bg-white hover:bg-smoky-white cursor-pointer"
                >
                    <CalendarIcon className="mr-2 size-4" />
                    {date ? (
                        format(date, "LLL dd, y")
                    ) : (
                        <span>Выберите дату</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align={isMobile ? "center" : "start"}>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    defaultMonth={date}
                    numberOfMonths={isMobile ? 1 : 2}
                />
            </PopoverContent>
        </Popover>
    );
}
