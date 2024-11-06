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
        className="card bg-white p-4 rounded-3 shadow-lg"
        style={{ width: "320px" }}
      >
        <div className="card-body">
          <div className="text-center mb-3">
            <h4 className="card-title">Forgot Password</h4>
          </div>
          <form className="needs-validation" noValidate>
            <div className="form-group mb-3">
              <label htmlFor="email">E-Mail Address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                required
                autoFocus
              />
              <div className="invalid-feedback">Email is invalid</div>
              <small className="form-text text-muted">
                By clicking "Reset Password" we will send a password reset link.
              </small>
            </div>
            <div className="d-flex justify-content-between">
              <button
                onClick={onClose}
                type="button"
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
