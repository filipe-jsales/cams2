import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

export default function DashboardLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Topbar />
        <Outlet />
      </Box>
    </Box>
  );
}
