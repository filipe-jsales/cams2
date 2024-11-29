import { useState } from "react";
import { Form, Button, ListGroup, InputGroup } from "react-bootstrap";

interface Group {
  id: number;
  name: string;
  cameras: number;
}

const GroupTab = () => {
  const [availableGroups, setAvailableGroups] = useState<Group[]>([
    { id: 1, name: "Grupo Padrão", cameras: 319 },
    { id: 2, name: "Recanto Dos Pinheiros", cameras: 3 },
    { id: 3, name: "Waldir Dib Mattar", cameras: 1 },
    { id: 4, name: "Jardim Havaí", cameras: 1 },
  ]);
  const [selectedGroups, setSelectedGroups] = useState<Group[]>([]);

  const [searchAvailable, setSearchAvailable] = useState("");
  const [searchSelected, setSearchSelected] = useState("");

  const handleAddGroup = (group: Group) => {
    setSelectedGroups((prev) => [...prev, group]);
    setAvailableGroups((prev) =>
      prev.filter((availableGroup) => availableGroup.id !== group.id)
    );
  };

  const handleRemoveGroup = (group: Group) => {
    setAvailableGroups((prev) => [...prev, group]);
    setSelectedGroups((prev) =>
      prev.filter((selectedGroup) => selectedGroup.id !== group.id)
    );
  };

  const filteredAvailableGroups = availableGroups.filter((group) =>
    group.name.toLowerCase().includes(searchAvailable.toLowerCase())
  );

  const filteredSelectedGroups = selectedGroups.filter((group) =>
    group.name.toLowerCase().includes(searchSelected.toLowerCase())
  );

  return (
    <div className="d-flex flex-column">
      <div className="d-flex">
        <div className="flex-grow-1 me-3">
          <h5>Grupos</h5>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Pesquisar grupos"
              value={searchAvailable}
              onChange={(e) => setSearchAvailable(e.target.value)}
            />
          </InputGroup>
          <ListGroup>
            {filteredAvailableGroups.map((group) => (
              <ListGroup.Item
                key={group.id}
                className="d-flex justify-content-between align-items-center"
              >
                {group.name} <span className="text-muted">Câmeras: {group.cameras}</span>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleAddGroup(group)}
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
            disabled={filteredAvailableGroups.length === 0}
            onClick={() => {
              filteredAvailableGroups.forEach((group) =>
                handleAddGroup(group)
              );
            }}
          >
            &gt;&gt;
          </Button>
          <Button
            variant="danger"
            disabled={filteredSelectedGroups.length === 0}
            onClick={() => {
              filteredSelectedGroups.forEach((group) =>
                handleRemoveGroup(group)
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
            {filteredSelectedGroups.map((group) => (
              <ListGroup.Item
                key={group.id}
                className="d-flex justify-content-between align-items-center"
              >
                {group.name} <span className="text-muted">Câmeras: {group.cameras}</span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveGroup(group)}
                >
                  -
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default GroupTab;
