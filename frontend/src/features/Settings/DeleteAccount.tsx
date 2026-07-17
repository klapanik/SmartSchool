import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const DeleteAccount = () => {
    return (
        <div className="w-full">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className="w-full h-7 sm:h-8 md:h-9 bg-[#EF5353] text-white rounded-lg font-bold cursor-pointer text-[10px] sm:text-xs md:text-sm hover:bg-[#EF6B6B] active:bg-[#EF6B6B] hover:shadow-md active:shadow-inner transition-all duration-200">
                        Удалить аккаунт
                    </button>
                </AlertDialogTrigger>

                <AlertDialogContent className="max-w-[90%] sm:max-w-md rounded-xl shadow-2xl bg-white p-4 sm:p-6">
                    <AlertDialogHeader className="space-y-2 sm:space-y-3">
                        <AlertDialogTitle className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                            Вы уверены, что хотите удалить аккаунт?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                            Все ваши данные, оценки и прогресс будут навсегда
                            удалены. Вы не сможете восстановить аккаунт или
                            войти в него снова.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                        <AlertDialogCancel className="w-full sm:w-auto bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-lg px-4 sm:px-6 py-2.5 sm:py-2 text-sm font-medium transition-colors cursor-pointer order-2 sm:order-1">
                            Вернуться назад
                        </AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            className="w-full sm:w-auto bg-[#EF5353] hover:bg-[#EF6B6B] text-white border-none rounded-lg px-4 sm:px-6 py-2.5 sm:py-2 text-sm font-medium transition-colors cursor-pointer order-1 sm:order-2"
                        >
                            Удалить
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
