import { Table, Button, Form, InputGroup } from "react-bootstrap";
import {
  Add,
  ArrowDownwardOutlined,
  DeleteOutline,
  EditOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { Permission } from "../../Types/permission.types";

interface PermissionsDataTableProps {
  permissions: Permission[];
}

export default function PermissionsDataTable({
  permissions,
}: PermissionsDataTableProps) {
  return (
    <div className="container p-2">
      <div className="d-flex justify-content-between p-2">
        <InputGroup className="search-bar" style={{ width: "250px" }}>
          <h3>Permissions</h3>
        </InputGroup>
        <div className="d-flex align-items-center">{"Home > Permissions"}</div>
      </div>
      <div className="row align-items-center">
        <div className="col-2">
          <Button variant="dark" className="w-100 rounded-3">
            <Add className="me-2" /> Novo
          </Button>
        </div>
        <div className="col-10">
          <InputGroup>
            <InputGroup.Text>
              <SearchOutlined />
            </InputGroup.Text>
            <Form.Control placeholder="Pesquisar" aria-label="Pesquisar" />
          </InputGroup>
        </div>
        <div className="col-2 mt-3">
          <Form.Select aria-label="Status">
            <option value="all">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </Form.Select>
        </div>
        <div className="col-2 mt-3">
          <Button variant="outline-secondary" className="w-100 rounded-3">
            Ordenar <ArrowDownwardOutlined className="ms-2" />
          </Button>
        </div>
      </div>
      <h6 className="my-3">Lista de Usuários</h6>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center align-middle">Nome</th>
            <th className="text-center align-middle">Usuários</th>
            <th className="text-center align-middle">Permissão Padrão</th>
            <th className="text-center align-middle">Ativo</th>
            <th className="text-center align-middle">Observações</th>
            <th className="text-center align-middle">Ações</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id}>
              <td className="text-center align-middle">{permission.name}</td>
              <td className="text-center align-middle">Usuários</td>
              <td className="text-center align-middle">Permissão padrão</td>
              <td className="">ativo?</td>
              <td className="">{permission.observations}</td>
              <td className="text-center align-middle">
                <Button variant="link" size="sm">
                  <EditOutlined className="text-primary" />
                </Button>
                <Button variant="link" size="sm">
                  <DeleteOutline className="text-danger" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
