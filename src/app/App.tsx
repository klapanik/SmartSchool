import RootLayout from "@/layouts/RootLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

export function App() {
  const routes = createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" /*element={ Главная страница } */ />
      <Route path="/" /*element={ Уроки } */ />
      <Route path="/" /*element={ Оценки } */ />
      <Route path="/" /*element={ Четверти } */ />
      <Route path="/" /*element={ Аналитика } */ />
    </Route>,
  );
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
