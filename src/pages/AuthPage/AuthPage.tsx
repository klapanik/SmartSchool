import { AuthTabs } from "@/widgets/AuthTabs/AuthTabs";
import { GraduationCap } from "lucide-react";

export function AuthPage() {
    return (
        <section className="h-screen w-full flex flex-col justify-center items-center bg-[url('/auth_background.png')] bg-cover bg-no-repeat bg-center">
            <div className="flex flex-col gap-5 items-center mb-7.5">
                <GraduationCap
                    strokeWidth={1.5}
                    className="size-14 bg-primary text-white rounded-full p-3"
                />
                <h2 className="page-title text-primary">SmartSchool</h2>
            </div>
            <AuthTabs />
        </section>
    );
}
