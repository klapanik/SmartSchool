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
                            className="flex h-10 items-center justify-center gap-2.5 rounded-lg border-0 bg-transparent px-3 text-[16px] font-medium text-[#6B7280] hover:bg-transparent hover:text-[#6B7280]"
                        >
                            <span className="sr-only lg:not-sr-only">Личный кабинет</span>
                            <UserRound className="h-4 w-4 text-[#6B7280] lg:h-4.5 lg:w-4.5 md:h-8 md:w-8 md:text-[#6B7280] sm:h-5 sm:w-5 sm:text-[#6B7280] max-sm:h-5 max-sm:w-5 max-sm:text-white" />
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
