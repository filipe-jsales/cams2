interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
      style={{ zIndex: 1050 }}
    >
      <div
        className="bg-white p-4 rounded-3 shadow-lg"
        style={{ width: "320px" }}
      >
        <h2 className="text-center fs-5 fw-semibold text-dark mb-3">
          Esqueceu sua senha?
        </h2>
        <p className="text-center text-muted mb-4">
          Confirme seu e-mail abaixo.
        </p>
        <input
          type="email"
          placeholder="Confirme seu e-mail abaixo."
          className="form-control mb-4"
        />
        <div className="d-flex justify-content-between">
          <button onClick={onClose} className="btn btn-secondary">
            Cancelar
          </button>
          <button className="btn btn-dark">Confirmar</button>
        </div>
      </div>
    </div>
  );
}
