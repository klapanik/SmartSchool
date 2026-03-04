import RootLayout from "@/layouts/RootLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

export function App() {
  const routes = createRoutesFromElements(
    <Route path="/" element={<RootLayout />}></Route>,
  );
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
