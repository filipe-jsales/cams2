import { Table, Button, Form, InputGroup } from "react-bootstrap";
import formatDate from "../../utils/FormatDate";
import {
  Add,
  ArrowDownwardOutlined,
  CancelOutlined,
  CheckCircleOutline,
  DeleteOutline,
  EditOutlined,
  LockOpenOutlined,
  LockOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { toggleUserStatus } from "../../../store/slices/userSlice";
import { User } from "../../Types/user.types";

interface UsersDataTableProps {
  users: User[];
  onRemoveUser: (id: number) => void;
}

export default function UsersDataTable({
  users,
  onRemoveUser,
}: UsersDataTableProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateCam = () => {
    navigate("/admin/dashboard/users/new");
  };

  const handleEditUser = (id: string) => {
    navigate(`/admin/dashboard/users/${id}`);
  };

  const handleToggleStatus = (id: number) => {
    dispatch(toggleUserStatus(id));
  };

  return (
    <div className="container p-2">
      <div className="d-flex justify-content-between justify-content-center p-2">
        <InputGroup className="search-bar" style={{ width: "250px" }}>
          <h3>Usuários</h3>
        </InputGroup>
        <div className="d-flex align-items-center">{"Home > Usuários"}</div>
      </div>
      <div className="row align-items-center">
        <div className="col-2">
          <button
            className="btn bg-dark text-white w-100 rounded-3"
            onClick={() => handleCreateCam()}
          >
            <Add className="me-2" /> Novo{" "}
          </button>
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
            <th className="text-center align-middle">Acesso</th>
            <th className="text-center align-middle">Nome</th>
            <th className="text-center align-middle">E-mail</th>
            <th className="text-center align-middle">Código de recuperação</th>
            <th className="text-center align-middle">Última atualização</th>
            <th className="text-center align-middle">Ativo</th>
            <th className="text-center align-middle">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="text-center align-middle">
                <button
                  className="btn"
                  onClick={() => handleToggleStatus(user.id)}
                >
                  {user.status === "active" ? (
                    <LockOpenOutlined className="text-success" />
                  ) : (
                    <LockOutlined className="text-danger" />
                  )}
                </button>
              </td>
              <td className="text-center align-middle">{`${user.firstName} ${user.lastName}`}</td>
              <td className="text-center align-middle">{user.email}</td>
              <td className="text-center align-middle">
                {user.recoveryCode || "-"}
              </td>
              <td className="text-center align-middle">
                {user.updatedAt ? formatDate(user.updatedAt) : "-"}
              </td>
              <td className="text-center align-middle">
                {user.status === "active" ? (
                  <CheckCircleOutline className="text-success" />
                ) : (
                  <CancelOutlined className="text-danger" />
                )}
              </td>
              <td className="text-center align-middle">
                <button
                  className="btn"
                  onClick={() => handleEditUser(user.id.toString())}
                >
                  <EditOutlined className="text-primary" />
                </button>
                <button className="btn" onClick={() => onRemoveUser(user.id)}>
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
