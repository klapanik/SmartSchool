import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserRound } from "lucide-react";

export function AppHeader() {
    return (
        <header className="h-14 flex items-center justify-between border-b w-full px-4 sm:px-6">
            <div className="my-auto">
                <h1 className="font-semibold text-xl text-primary-foreground sm:text-2xl">
                    Дневник Оценок
                </h1>
            </div>
            <div className="my-auto">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            aria-label="Личный кабинет"
                            className="flex h-10 items-center justify-center gap-2.5 rounded-lg border-0 bg-transparent px-3 text-[16px] font-medium text-[#6B7280] shadow-none transition-colors hover:bg-transparent hover:text-[#6B7280] md:h-11 md:w-11 md:rounded-full md:bg-transparent md:px-0 md:hover:bg-[#F3F4F6] max-md:h-10 max-md:w-10 max-md:rounded-full max-md:bg-[#A855F7] max-md:shadow-[0_2px_8px_rgba(168,85,247,0.25)] max-md:hover:bg-[#9333EA] lg:h-10 lg:px-3 lg:text-[16px] lg:font-medium lg:text-[#6B7280]"
                        >
                            <span className="hidden lg:inline">Личный кабинет</span>
                            <UserRound className="h-5 w-5 shrink-0 text-[#6B7280] lg:h-4.5 lg:w-4.5 md:h-6 md:w-6 md:text-[#6B7280] max-md:h-5 max-md:w-5 max-md:text-white" />
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
