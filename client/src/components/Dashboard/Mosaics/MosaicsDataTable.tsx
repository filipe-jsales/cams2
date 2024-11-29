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
import { Mosaic } from "../../Types/mosaic.type";
import { useNavigate } from "react-router-dom";

interface MosaicsDataTableProps {
  mosaics: Mosaic[];
  onRemoveMosaic: (id: number) => void;
}

export default function MosaicsDataTable({
  mosaics,
  onRemoveMosaic,
}: MosaicsDataTableProps) {
  const navigate = useNavigate();

  const handleCreateMosaic = () => {
    navigate("/admin/dashboard/mosaics/new");
  };

  const handleEditMosaic = (id: string) => {
    navigate(`/admin/dashboard/mosaics/${id}`);
  };

  return (
    <div className="container p-2">
      <div className="d-flex justify-content-between p-2">
        <InputGroup className="search-bar" style={{ width: "250px" }}>
          <h3>Mosaics</h3>
        </InputGroup>
        <div className="d-flex align-items-center">{"Home > Mosaics"}</div>
      </div>
      <div className="row align-items-center">
        <div className="col-2">
          <button
            className="btn bg-dark text-white w-100 rounded-3"
            onClick={() => handleCreateMosaic()}
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
            <th className="text-center align-middle">Tipo</th>
            <th className="text-center align-middle">Nome</th>
            <th className="text-center align-middle">Capacidade</th>
            <th className="text-center align-middle">Câmeras</th>
            <th className="text-center align-middle">Usuários</th>
            <th className="text-center align-middle">Ativo</th>
            <th className="text-center align-middle">Ações</th>
          </tr>
        </thead>
        <tbody>
          {mosaics.map((mosaic) => (
            <tr key={mosaic.id}>
              <td className="text-center align-middle">{mosaic.type}</td>
              <td className="text-center align-middle">{mosaic.name}</td>
              <td className="text-center align-middle">{mosaic.capacity}</td>
              <td className="text-center align-middle">{mosaic.cameraCount}</td>
              <td className="text-center align-middle">{mosaic.userCount}</td>
              <td className="text-center align-middle">
                {mosaic.isActive ? (
                  <CheckOutlined style={{ color: "green" }} />
                ) : (
                  <CancelOutlined style={{ color: "red" }} />
                )}
              </td>
              <td className="text-center align-middle">
                <button
                  className="btn"
                  onClick={() =>
                    mosaic.id && handleEditMosaic(mosaic.id.toString())
                  }
                >
                  <EditOutlined className="text-primary" />
                </button>
                <button
                  className="btn"
                  onClick={() => mosaic.id && onRemoveMosaic(mosaic.id)}
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
