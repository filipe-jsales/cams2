import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/slices/authSlice";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  requiredRole?: string;
}

interface JwtPayload {
  sub: number;
  email: string;
  roles: string[];
  iat: number;
  exp: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { loading, token } = useSelector(selectAuth);

  const storedToken = localStorage.getItem("token");
  const jwtToken = token || storedToken;

  let decodedToken: JwtPayload | null = null;

  if (jwtToken) {
    try {
      decodedToken = jwtDecode<JwtPayload>(jwtToken);
    } catch (error) {
      console.error("Token inválido:", error);
    }
  }

  const currentUserRoles = decodedToken?.roles || [];

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!decodedToken) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !currentUserRoles.includes(requiredRole)) {
    return <Navigate to="/no-access" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
