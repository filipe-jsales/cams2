import React, { useState } from "react";
import { Tabs, Tab, Form, Button } from "react-bootstrap";

interface CamFormLayoutProps {
  title: string;
  formData: {
    name: string;
    URL: string;
    protocol: string;
    status: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isCreateForm?: boolean;
}

export default function CamFormLayout({
  title,
  formData,
  handleInputChange,
  handleSubmit,
  isCreateForm,
}: CamFormLayoutProps) {
  const [activeTab, setActiveTab] = useState("basicInfo");

  return (
    <div>
      <h2 className="text-white p-2 bg-danger">{title}</h2>
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "basicInfo")}
        className="mb-3"
      >
        <Tab eventKey="basicInfo" title="Dados básicos">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Insira um nome para a câmera"
              />
            </Form.Group>
            {isCreateForm ? (
              <Form.Group controlId="formProtocol">
                <Form.Label>Protocolo</Form.Label>
                <Form.Select
                  name="protocol"
                  value={formData.protocol}
                  // @ts-expect-error - TS doesn't know that all options have a value property
                  onChange={handleInputChange}
                >
                  <option value="RTSP">RTSP</option>
                  <option value="RTMP">RTMP</option>
                </Form.Select>
              </Form.Group>
            ) : (
              <Form.Group controlId="URL">
                <Form.Label>URL RTSP</Form.Label>
                <Form.Control
                  type="text"
                  name="URL"
                  value={formData.URL}
                  onChange={handleInputChange}
                />
              </Form.Group>
            )}
            <Form.Group controlId="formStatus" className="mt-3">
              <Form.Label>Ativo</Form.Label>
              <Form.Check
                type="switch"
                name="status"
                checked={formData.status === "active"}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Salvar
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="plan" title="Plano">
          <p>Conteúdo da aba Plano...</p>
        </Tab>
        <Tab eventKey="location" title="Localização">
          <p>Conteúdo da aba Localização...</p>
        </Tab>
        <Tab eventKey="advertising" title="Publicidade">
          <p>Conteúdo da aba Publicidade...</p>
        </Tab>
        <Tab eventKey="settings" title="Configuração">
          <p>Conteúdo da aba Configuração...</p>
        </Tab>
      </Tabs>
    </div>
  );
}
