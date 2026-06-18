import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";

export function AuthTabs() {
    return (
        <div className="bg-smoky-white p-6 flex flex-col rounded-lg gap-5">
            <div className="flex flex-col items-center">
                <div className="flex gap-2 items-center justify-center">
                    <BookOpen />
                    <p className="text-2xl font-bold">Добро пожаловать</p>
                </div>
                <span className="text-gray-500">Войдите или создайте новый аккаунт</span>
            </div>
            <div className="w-full ">
                <Tabs defaultValue="login">
                    <TabsList className="w-full flex justify-between">
                        <TabsTrigger
                            value="login"
                            className="text-black w-full data-[state=active]:bg-white cursor-pointer"
                        >
                            Вход
                        </TabsTrigger>
                        <TabsTrigger
                            value="register"
                            className="text-black w-full data-[state=active]:bg-white cursor-pointer"
                        >
                            Регистрация
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <span className="text-gray-500">Тут можно будет войти</span>
                    </TabsContent>
                    <TabsContent value="register">
                        <span className="text-gray-500">Тут можно будет зарегестрироваться</span>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
