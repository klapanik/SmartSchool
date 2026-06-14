import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserRound } from "lucide-react";

export function AppHeader() {
    return (
        <header className="h-14 flex justify-between items-center border-b w-full">
            <h1 className="ml-11 my-auto font-semibold text-xl text-primary-foreground sm:ml-12 sm:text-2xl">
                Дневник Оценок
            </h1>
            <div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex h-10 items-center justify-center gap-2.5 rounded-lg border-0 bg-transparent px-3 text-[16px] font-medium text-[#6B7280] hover:bg-transparent hover:text-[#6B7280]"
                        >
                            <span className="hidden lg:inline text-xl">Личный кабинет</span>
                            <UserRound className="size-7 bg-primary text-white rounded-full p-1 md:bg-transparent md:text-gray-500 md:size-9 lg:size-7" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="leading-none font-medium">Dimensions</h4>
                                <p className="text-sm text-muted-foreground">
                                    Set the dimensions for the layer.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="width">Width</Label>
                                    <Input
                                        id="width"
                                        defaultValue="100%"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="maxWidth">Max. width</Label>
                                    <Input
                                        id="maxWidth"
                                        defaultValue="300px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="height">Height</Label>
                                    <Input
                                        id="height"
                                        defaultValue="25px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="maxHeight">Max. height</Label>
                                    <Input
                                        id="maxHeight"
                                        defaultValue="none"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </header>
    );
}
