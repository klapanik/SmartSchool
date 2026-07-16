import { Save, X } from "lucide-react";

type Props = {
    value: string;
    onClick: () => void;
};

export function PersonalDataForm({ value, onClick }: Props) {
    return (
        <form className="relative w-full" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                className="bg-smoky-white border border-gray-300 rounded-lg px-2.5 py-2 w-full text-sm"
                placeholder={value}
            />
            <div className="absolute flex right-2.5 top-1/2 -translate-y-1/2">
                <button className="mr-1" onClick={onClick}>
                    <X className="size-3 cursor-pointer" />
                </button>
                <button className="text-white p-1 rounded-md bg-primary" onClick={onClick}>
                    <Save className="size-3 cursor-pointer" />
                </button>
            </div>
        </form>
    );
}
