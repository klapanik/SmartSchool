import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Profile } from "@/features/Profile";
import { UserRound } from "lucide-react";

export function AppHeader() {
    return (
        <header className="h-14 flex justify-between items-center border-b w-full">
            <h1 className="ml-11 my-auto font-semibold text-xl text-primary-foreground sm:ml-12 sm:text-2xl">
                Дневник Оценок
            </h1>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="bg-transparent text-base text-muted-foreground hover:bg-transparent">
                        <span className="hidden lg:inline text-lg font-normal">Личный кабинет</span>
                        <UserRound className="size-8 bg-primary text-white rounded-full p-1.5 md:bg-transparent md:text-gray-500 md:size-9 lg:size-6 lg:p-0" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-85 p-0 border-0 mr-5">
                    <Profile />
                </PopoverContent>
            </Popover>
        </header>
    );
}
