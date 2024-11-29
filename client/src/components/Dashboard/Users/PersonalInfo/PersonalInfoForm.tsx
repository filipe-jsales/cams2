import { Form } from "react-bootstrap";
import { UserLayoutFormProps } from "../UserForm/UserFormLayout";

export default function PersonalInfoForm({ formData, handleInputChange }: UserLayoutFormProps) {
  return (
    <div className="p-3">
      <Form>
        <div className="row">
          <div className="col-md-4">
            <Form.Group controlId="formPhone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-md-4">
            <Form.Group controlId="formRg">
              <Form.Label>RG</Form.Label>
              <Form.Control
                type="text"
                name="rg"
                id="rg"
                value={formData.rg}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-md-4">
            <Form.Group controlId="formCpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                name="cpf"
                id="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3">
            <Form.Group controlId="formCep">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                name="cep"
                id="cep"
                value={formData.cep}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group controlId="formState">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group controlId="formCity">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <Form.Group controlId="formNeighborhood">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                name="neighborhood"
                id="neighborhood"
                value={formData.neighborhood}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-md-4">
            <Form.Group controlId="formStreet">
              <Form.Label>Rua</Form.Label>
              <Form.Control
                type="text"
                name="street"
                id="street"
                value={formData.street}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className="col-md-4">
            <Form.Group controlId="formNumber">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                name="number"
                id="number"
                value={formData.number}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <Form.Group controlId="formComplement">
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                type="text"
                name="complement"
                id="complement"
                value={formData.complement}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <Form.Group controlId="formObservations">
              <Form.Label>Observações</Form.Label>
              <Form.Control
                as="textarea"
                name="observations"
                id="observations"
                value={formData.observations}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>
      </Form>
    </div>
  );
}
