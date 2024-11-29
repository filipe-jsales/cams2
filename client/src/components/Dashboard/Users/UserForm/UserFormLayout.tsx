import React, { useState } from "react";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import UserBasicInfoForm from "../../../Users/UserBasicInfoForm";
import PersonalInfoForm from "../PersonalInfo/PersonalInfoForm";
import GroupTab from "../../Groups/GroupTab";
import PermissionsTab from "../../Permissions/PermissionsTab";
import MosaicsTab from "../../Mosaics/MosaicsTab";

export interface UserLayoutFormProps {
  title?: string;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    rg?: string;
    cpf?: string;
    cep?: string;
    state?: string;
    city?: string;
    neighborhood?: string;
    street?: string;
    number?: string;
    complement?: string;
    observations?: string;
  };
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (e: React.FormEvent) => void;
  isCreateForm?: boolean;
}

export default function UserFormLayout({
  title,
  formData,
  handleInputChange,
  handleSubmit,
}: UserLayoutFormProps) {
  const [activeTab, setActiveTab] = useState("basicInfo");

  return (
    <div>
      <h2 className="text-white p-2 bg-danger">{title}</h2>
      <UserBasicInfoForm
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "basicInfo")}
        className="mb-3"
      >
        <Tab eventKey="basicInfo" title="Pessoa Física">
          <Form onSubmit={handleSubmit}>
            <PersonalInfoForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <Button variant="primary" type="submit" className="mt-3">
              Salvar
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="plan" title="Grupos">
          <GroupTab />
        </Tab>
        <Tab eventKey="location" title="Permissões">
          <PermissionsTab />
        </Tab>
        <Tab eventKey="advertising" title="Mosaicos">
          <MosaicsTab />
        </Tab>
      </Tabs>
    </div>
  );
}
