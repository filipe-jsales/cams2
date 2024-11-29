import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ForgotPasswordModal from "../Modal/ForgotPasswordModal/ForgotPasswordModal";
import { toast } from "react-toastify";
import { fetchProfile, login, selectAuth } from "../../store/slices/authSlice";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  roles: string[];
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const dispatch: AppDispatch = useDispatch();
  useSelector(selectAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password }));

      if (login.fulfilled.match(result)) {
        // Após login, buscar o perfil
        await dispatch(fetchProfile());
        toast.success("Login realizado com sucesso!");

        // Decodificar o token JWT para verificar os papéis
        const token = result.payload?.token || localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode<JwtPayload>(token);
          const isAdmin = decodedToken.roles.includes("admin");

          // Redirecionar com base no papel
          if (isAdmin) {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
        } else {
          // Caso o token esteja ausente (falha inesperada)
          toast.error("Erro ao obter informações de login.");
        }
      } else {
        toast.error(
          typeof result.payload === "string"
            ? result.payload
            : "Erro ao fazer login."
        );
      }
    } catch (error) {
      // @ts-expect-error omitindo o tipo para simplificar
      toast.error(error?.message || "Erro ao fazer login.");
    }
  };

  const openForgotPasswordModal = () => setIsForgotPasswordModalOpen(true);
  const closeForgotPasswordModal = () => setIsForgotPasswordModalOpen(false);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-8">
          <div>
            <div className="card-body">
              <div className="text-center mb-4">
                <h2 className="card-title">Bem-vindo!</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">E-Mail</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    placeholder="E-mail"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="password">Senha</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control mt-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Senha"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-danger rounded-5 w-100"
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
          <button
            type="button"
            onClick={openForgotPasswordModal}
            className="btn float-end text-danger mt-1 p-0 small mt-3 mb-3"
          >
            Esqueceu sua senha?
          </button>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={closeForgotPasswordModal}
      />
    </div>
  );
}
