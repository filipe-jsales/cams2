import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardPage from "../pages/admin/DashboardPage";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import ProtectedRoute from "../utils/ProtectedRoute";
import ExamplePage from "../pages/example";
import CreateUserPage from "../pages/admin/dashboard/Users/CreateUserPage";
import UsersPage from "../pages/admin/dashboard/Users/UsersPage";
import EditUserPage from "../pages/admin/dashboard/Users/EditUserPage";
import CamsPage from "../pages/admin/dashboard/Cams/CamsPage";
import CreateCamPage from "../pages/admin/dashboard/Cams/CreateCamPage";
import EditCamPage from "../pages/admin/dashboard/Cams/EditCamPage";
import MosaicsPage from "../pages/admin/dashboard/Mosaics/MosaicsPage";
import GroupsPage from "../pages/admin/dashboard/Groups/GroupsPage";
import PermissionsPage from "../pages/admin/dashboard/Permissions/PermissionsPage";
import HomePage from "../pages/home/HomePage";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface JwtPayload {
  roles: string[];
}

export function AppRouter() {
  const { token } = useSelector(selectAuth);
  const storedToken = localStorage.getItem("token");
  const jwtToken = token || storedToken;

  let decodedToken: JwtPayload | null = null;

  if (jwtToken) {
    try {
      decodedToken = jwtDecode<JwtPayload>(jwtToken);
    } catch {
      toast.error("Token inválido.");
    }
  }

  const isAdmin = decodedToken?.roles.includes("admin");

  return (
    <Router>
      <Routes>
        <Route path="/example" element={<ExamplePage />} />
        <Route
          path="/"
          element={<Navigate to="/dashboard-redirect" replace />}
        />
        <Route path="/login" element={<HomePage />} />
        <Route path="/no-access" element={<h1>No Access</h1>} />

        <Route
          path="/dashboard-redirect"
          element={
            // @ts-expect-error omitindo o tipo para simplificar
            <ProtectedRoute>
              {isAdmin ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )}
            </ProtectedRoute>
          }
        />

        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/new" element={<CreateUserPage />} />
            <Route path="users/:id" element={<EditUserPage />} />
            <Route path="cams" element={<CamsPage />} />
            <Route path="cams/new" element={<CreateCamPage />} />
            <Route path="cams/:id" element={<EditCamPage />} />
            <Route path="mosaics" element={<MosaicsPage />} />
            <Route path="groups" element={<GroupsPage />} />
            <Route path="permissions" element={<PermissionsPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<h1>General User Dashboard</h1>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
