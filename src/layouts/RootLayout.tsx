import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="p-6">
      <Outlet />
    </div>
  );
};

export default RootLayout;
