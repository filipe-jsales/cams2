import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

export default function DashboardLayout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}
