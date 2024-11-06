import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPasswordModal from "../Modal/ForgotPasswordModal/ForgotPasswordModal";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false); // Estado para o modal
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      console.log("Login bem-sucedido:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const openForgotPasswordModal = () => setIsForgotPasswordModalOpen(true);
  const closeForgotPasswordModal = () => setIsForgotPasswordModalOpen(false);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="text-center mb-4">
                <img src="img/logo.jpg" alt="logo" className="mb-3" />
                <h4 className="card-title">Login</h4>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">E-Mail Address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={openForgotPasswordModal}
                    className="btn btn-link float-end mt-1 p-0 small"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember"
                  />
                  <label className="form-check-label" htmlFor="remember">
                    Remember Me
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>

                <div className="text-center mt-3">
                  <p className="small">
                    Don’t have an account yet?{" "}
                    <a href="/register">Create One</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="text-center mt-3 text-muted">
            &copy; 2024 &mdash; Your Company
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={closeForgotPasswordModal}
      />{" "}
      {/* Adiciona o modal */}
    </div>
  );
}
