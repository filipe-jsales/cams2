import { Table, Button, Form, InputGroup } from "react-bootstrap";
import {
  Add,
  ArrowDownwardOutlined,
  CancelOutlined,
  CheckOutlined,
  DeleteOutline,
  EditOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { Group } from "../../Types/group.types";
import { useNavigate } from "react-router-dom";

interface GroupsDataTableProps {
  groups: Group[];
  onRemoveGroup: (id: number) => void;
}

export default function GroupsDataTable({
  groups,
  onRemoveGroup,
}: GroupsDataTableProps) {
  const navigate = useNavigate();

  const handleEditCam = (id: string) => {
    navigate(`/admin/dashboard/cams/${id}`);
  };

  return (
    <div className="container p-2">
      <div className="d-flex justify-content-between p-2">
        <InputGroup className="search-bar" style={{ width: "250px" }}>
          <h3>Groups</h3>
        </InputGroup>
        <div className="d-flex align-items-center">{"Home > Groups"}</div>
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
            <th className="text-center">Nome</th>
            <th className="text-center">Câmeras</th>
            <th className="text-center">Usuários</th>
            <th className="text-center">Padrão</th>
            <th className="text-center">Ativo</th>
            <th className="text-center">Observações</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td className="text-center">{group.name}</td>
              <td className="text-center">teste</td>
              <td className="text-center">{group.usersQuantity}</td>
              <td className="text-center">
                {group.isDefault ? <CheckOutlined /> : <CancelOutlined />}
              </td>
              <td className="text-center">
                {group.isActive ? <CheckOutlined /> : <CancelOutlined />}
              </td>
              <td className="">{group.observations}</td>
              <td className="text-center">
                <button
                  className="btn"
                  onClick={() => handleEditCam(group.id.toString())}
                >
                  <EditOutlined className="text-primary" />
                </button>
                <button
                  className="btn"
                  onClick={() => group.id && onRemoveGroup(group.id)}
                >
                  <DeleteOutline className="text-danger" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
