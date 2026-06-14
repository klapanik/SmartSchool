import { GraduationCap } from "lucide-react";

export function AuthPage() {
    return (
        <section className="h-screen w-full flex flex-col justify-center items-center bg-[url('/auth_background.png')] bg-cover bg-no-repeat bg-center">
            <div className="flex flex-col gap-5 items-center">
                <GraduationCap
                    size={60}
                    strokeWidth={1}
                    className="bg-primary text-white rounded-full py-1.5 px-2.5"
                />
                <h2 className="page-title text-primary">SmartSchool</h2>
            </div>
        </section>
    );
}
