import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardHome from "./pages/DashboardHome";
import UsersHome from "./pages/UsersHome";
import CamsHome from "./pages/CamsHome";
import DashboardLayout from "./components/Dashboard/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<UsersHome />} />
          <Route path="cams" element={<CamsHome />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
