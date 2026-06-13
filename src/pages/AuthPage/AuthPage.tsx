import { GraduationCap } from "lucide-react";

export function AuthPage() {
    return (
        <section>
            <div className="flex flex-col gap-5 justify-center items-center">
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
