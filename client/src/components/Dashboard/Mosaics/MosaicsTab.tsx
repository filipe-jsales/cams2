import { useState } from "react";
import { Form, Button, ListGroup, InputGroup } from "react-bootstrap";

interface Mosaic {
  id: number;
  name: string;
  cameras: number;
}

const MosaicsTab = () => {
  const [availableMosaics, setAvailableMosaics] = useState<Mosaic[]>([
    { id: 1, name: "Luizmar Pereira de Castro", cameras: 1 },
    { id: 2, name: "Erick Fernando Rangel de Oliveira", cameras: 3 },
    { id: 3, name: "Erick Fernando Rangel de Oliveira (02)", cameras: 6 },
    { id: 4, name: "isaias", cameras: 6 },
  ]);
  const [selectedMosaics, setSelectedMosaics] = useState<Mosaic[]>([]);

  const [searchAvailable, setSearchAvailable] = useState("");
  const [searchSelected, setSearchSelected] = useState("");

  const handleAddMosaic = (mosaic: Mosaic) => {
    setSelectedMosaics((prev) => [...prev, mosaic]);
    setAvailableMosaics((prev) =>
      prev.filter((availableMosaic) => availableMosaic.id !== mosaic.id)
    );
  };

  const handleRemoveMosaic = (mosaic: Mosaic) => {
    setAvailableMosaics((prev) => [...prev, mosaic]);
    setSelectedMosaics((prev) =>
      prev.filter((selectedMosaic) => selectedMosaic.id !== mosaic.id)
    );
  };

  const filteredAvailableMosaics = availableMosaics.filter((mosaic) =>
    mosaic.name.toLowerCase().includes(searchAvailable.toLowerCase())
  );

  const filteredSelectedMosaics = selectedMosaics.filter((mosaic) =>
    mosaic.name.toLowerCase().includes(searchSelected.toLowerCase())
  );

  return (
    <div className="d-flex flex-column">
      <h4>Gerenciar Mosaicos</h4>
      <div className="d-flex">
        <div className="flex-grow-1 me-3">
          <h5>Mosaicos</h5>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Pesquisar mosaicos"
              value={searchAvailable}
              onChange={(e) => setSearchAvailable(e.target.value)}
            />
          </InputGroup>
          <ListGroup>
            {filteredAvailableMosaics.map((mosaic) => (
              <ListGroup.Item
                key={mosaic.id}
                className="d-flex justify-content-between align-items-center"
              >
                {mosaic.name}{" "}
                <span className="text-muted">Câmeras: {mosaic.cameras}</span>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleAddMosaic(mosaic)}
                >
                  +
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <div className="d-flex flex-column justify-content-center">
          <Button
            variant="primary"
            className="mb-2"
            disabled={filteredAvailableMosaics.length === 0}
            onClick={() => {
              filteredAvailableMosaics.forEach((mosaic) =>
                handleAddMosaic(mosaic)
              );
            }}
          >
            &gt;&gt;
          </Button>
          <Button
            variant="danger"
            disabled={filteredSelectedMosaics.length === 0}
            onClick={() => {
              filteredSelectedMosaics.forEach((mosaic) =>
                handleRemoveMosaic(mosaic)
              );
            }}
          >
            &lt;&lt;
          </Button>
        </div>

        <div className="flex-grow-1 ms-3">
          <h5>Seleções</h5>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Pesquisar seleções"
              value={searchSelected}
              onChange={(e) => setSearchSelected(e.target.value)}
            />
          </InputGroup>
          <ListGroup>
            {filteredSelectedMosaics.map((mosaic) => (
              <ListGroup.Item
                key={mosaic.id}
                className="d-flex justify-content-between align-items-center"
              >
                {mosaic.name}{" "}
                <span className="text-muted">Câmeras: {mosaic.cameras}</span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveMosaic(mosaic)}
                >
                  x
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default MosaicsTab;
