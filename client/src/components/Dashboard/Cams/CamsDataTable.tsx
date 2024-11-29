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
import { useNavigate } from "react-router-dom";
import { Cam } from "../../Types/cam.types";

interface CamsDataTableProps {
  cams: Cam[];
  onRemoveCam: (id: number) => void;
}

export default function CamsDataTable({
  cams,
  onRemoveCam,
}: CamsDataTableProps) {
  const navigate = useNavigate();

  const handleCreateCam = () => {
    navigate("/admin/dashboard/cams/new");
  };

  const handleEditCam = (id: string) => {
    navigate(`/admin/dashboard/cams/${id}`);
  };

  return (
    <div className="container p-2">
      <div className="d-flex justify-content-between p-2">
        <InputGroup className="search-bar" style={{ width: "250px" }}>
          <h3>Cams</h3>
        </InputGroup>
        <div className="d-flex align-items-center">{"Home > Cams"}</div>
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
            <th className="text-center align-middle">ID</th>
            <th className="text-center align-middle">Nome</th>
            <th className="text-center align-middle">Tipo</th>
            <th className="text-center align-middle">Analítico</th>
            <th className="text-center align-middle">Hospedagem</th>
            <th className="text-center align-middle">Armazenamento</th>
            <th className="text-center align-middle">Resolução</th>
            <th className="text-center align-middle">Status</th>
            <th className="text-center align-middle">Observações</th>
            <th className="text-center align-middle">Ações</th>
          </tr>
        </thead>
        <tbody>
          {cams.map((cam) => (
            <tr key={cam.id}>
              <td className="text-center align-middle">{cam.id}</td>
              <td className="text-center align-middle">{cam.name}</td>
              <td className="text-center align-middle">{cam.protocol}</td>
              <td className="text-center align-middle">
                {cam.isAnalytical ? <CheckOutlined /> : <CancelOutlined />}
              </td>
              <td className="text-center align-middle">{cam.hostingDays}</td>
              <td className="text-center align-middle">{cam.storage}</td>
              <td className="text-center align-middle">{cam.resolution}</td>
              <td className="text-center align-middle">{cam.status}</td>
              <td className="text-center align-middle">{cam.observations}</td>
              <td className="text-center align-middle">
                <button
                  className="btn"
                  onClick={() => handleEditCam(cam.id.toString())}
                >
                  <EditOutlined className="text-primary" />
                </button>
                <button
                  className="btn"
                  onClick={() => cam.id && onRemoveCam(cam.id)}
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
