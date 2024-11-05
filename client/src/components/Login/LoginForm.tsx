"use client";
import { useState } from "react";
import ForgotPasswordModal from "../Modal/ForgotPasswordModa/ForgotPasswordModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
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
    <section className="bg-light w-100">
      <div className="d-flex flex-column align-items-center justify-content-center px-4 py-5 h-100">
        <a href="#" className="d-flex align-items-center mb-4 text-dark">
          <span className="ms-2 fs-3 fw-semibold">Flowbite</span>
        </a>
        <div
          className="card shadow border-0 w-100"
          style={{ maxWidth: "400px" }}
        >
          <div className="card-body">
            <h1 className="h5 mb-4 fw-bold">Sign in to your account</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-medium">
                  Your email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-medium">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Sign in
              </button>
              <div className="text-center mt-3">
                <p className="small text-muted">
                  Don’t have an account yet?{" "}
                  <a href="#" className="text-primary fw-medium">
                    Sign up
                  </a>
                </p>
              </div>
            </form>
            <button
              onClick={openForgotPasswordModal}
              className="btn btn-link text-primary text-decoration-none mt-2 p-0"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={closeForgotPasswordModal}
      />
    </section>
  );
}
