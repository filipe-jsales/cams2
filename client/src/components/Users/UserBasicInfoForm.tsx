import { Form } from "react-bootstrap";
import { UserLayoutFormProps } from "../Dashboard/Users/UserForm/UserFormLayout";

function UserBasicInfoForm({ formData, handleInputChange }: UserLayoutFormProps) {
  return (
    <div className="border-top border-secondary rounded shadow-sm mb-4 mt-2">
      <Form className="p-3">
        <div className="row">
          <div className="col-5">
            <Form.Group controlId="firstName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                id="firstName"
                value={`${formData.firstName}`}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-4">
            <Form.Group controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-1">
            <Form.Group controlId="isActive" className="mt-3">
              <Form.Label>Ativo</Form.Label>
              <Form.Check
                type="switch"
                name="isActive"
                id="isActive"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-2">
            <Form.Group controlId="publicCameras" className="mt-3">
              <Form.Label>Câmeras Públicas</Form.Label>
              <Form.Check
                type="switch"
                name="publicCameras"
                id="publicCameras"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-3">
            <Form.Group controlId="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-3">
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-3">
            <Form.Group controlId="type">
              <Form.Label>Tipo de Pessoa</Form.Label>
              <Form.Select
                name="type"
                id="type"
                value={"Pessoa Física"}
                disabled={true}
                // @ts-expect-error - TS doesn't know that all options have a value
                onChange={handleInputChange}
              >
                <option value="RTSP">Pessoa Física</option>
                <option value="RTMP">Pessoa Jurídica</option>
              </Form.Select>
            </Form.Group>
          </div>
          {/* <div className="col-3">
            <Form.Group controlId="responsible">
              <Form.Label>Responsável</Form.Label>
              <Form.Select
                name="responsible"
                id="responsible"
                value={"Nenhum responsável adicionado"}
              >
                <option value="RTSP">Pessoa Física</option>
                <option value="RTMP">Pessoa Jurídica</option>
              </Form.Select>
            </Form.Group>
          </div> */}
        </div>
      </Form>
    </div>
  );
}

export default UserBasicInfoForm;
