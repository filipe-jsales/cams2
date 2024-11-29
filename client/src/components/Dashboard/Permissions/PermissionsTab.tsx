import { useState } from "react";
import { Form, Button, ListGroup, InputGroup } from "react-bootstrap";

interface Permission {
  id: number;
  name: string;
  users: number;
}

const PermissionsTab = () => {
  const [availablePermissions, setAvailablePermissions] = useState<Permission[]>([
    { id: 1, name: "Administradores", users: 2 },
    { id: 2, name: "Clientes", users: 268 },
    { id: 3, name: "Operadores", users: 15 },
  ]);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);

  const [searchAvailable, setSearchAvailable] = useState("");
  const [searchSelected, setSearchSelected] = useState("");

  const handleAddPermission = (permission: Permission) => {
    setSelectedPermissions((prev) => [...prev, permission]);
    setAvailablePermissions((prev) =>
      prev.filter((availablePermission) => availablePermission.id !== permission.id)
    );
  };

  const handleRemovePermission = (permission: Permission) => {
    setAvailablePermissions((prev) => [...prev, permission]);
    setSelectedPermissions((prev) =>
      prev.filter((selectedPermission) => selectedPermission.id !== permission.id)
    );
  };

  const filteredAvailablePermissions = availablePermissions.filter((permission) =>
    permission.name.toLowerCase().includes(searchAvailable.toLowerCase())
  );

  const filteredSelectedPermissions = selectedPermissions.filter((permission) =>
    permission.name.toLowerCase().includes(searchSelected.toLowerCase())
  );

  return (
    <div className="d-flex flex-column">
      <h4>Gerenciar Permissões</h4>
      <div className="d-flex">
        <div className="flex-grow-1 me-3">
          <h5>Permissões</h5>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Pesquisar permissões"
              value={searchAvailable}
              onChange={(e) => setSearchAvailable(e.target.value)}
            />
          </InputGroup>
          <ListGroup>
            {filteredAvailablePermissions.map((permission) => (
              <ListGroup.Item
                key={permission.id}
                className="d-flex justify-content-between align-items-center"
              >
                {permission.name}{" "}
                <span className="text-muted">Usuários: {permission.users}</span>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleAddPermission(permission)}
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
            disabled={filteredAvailablePermissions.length === 0}
            onClick={() => {
              filteredAvailablePermissions.forEach((permission) =>
                handleAddPermission(permission)
              );
            }}
          >
            &gt;&gt;
          </Button>
          <Button
            variant="danger"
            disabled={filteredSelectedPermissions.length === 0}
            onClick={() => {
              filteredSelectedPermissions.forEach((permission) =>
                handleRemovePermission(permission)
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
            {filteredSelectedPermissions.map((permission) => (
              <ListGroup.Item
                key={permission.id}
                className="d-flex justify-content-between align-items-center"
              >
                {permission.name}{" "}
                <span className="text-muted">Usuários: {permission.users}</span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemovePermission(permission)}
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

export default PermissionsTab;
