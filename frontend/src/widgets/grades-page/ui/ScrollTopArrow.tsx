import { Button } from "@/components/ui/button";
import { MoveUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollTopArrow() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Button
            className={`${isVisible ? "fixed" : "hidden"} 
                bottom-8 right-10 rounded-full size-12 text-white`}
            onClick={scrollToTop}
        >
            <MoveUp className="size-5" />
        </Button>
    );
}
