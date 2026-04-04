import "./Hero.css";

export function Hero() {
    return (
        <section
            className="rounded-lg p-6 w-full flex justify-between transition-all duration-500 cursor-pointer
                shadow-[0_4px_20px_-2px_#7c3aed3f] hover:shadow-[0_4px_20px_-2px_#7c3aed88] flex-col @lg:flex-row"
        >
            <div>
                <h2 className="font-bold text-lg xs:text-xl md:text-2xl">
                    Добро пожаловать,&nbsp;
                    <span className="cursor-pointer flowtext">Константин</span>!
                </h2>
                <p className="text-gray-500 text-sm md:text-base">9А класс</p>
            </div>

            <div className="text-sm md:text-base self-end">
                <p className="text-gray-500">суббота, 18 октября</p>
                <p>Уроки закончились</p>
            </div>
        </section>
    );
}
