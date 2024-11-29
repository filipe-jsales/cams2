import React from "react";
import { toast } from "react-toastify";
import UserFormLayout from "./UserFormLayout";
import { useUserFormData } from "./useUserFormData";

export default function CreateUserForm() {
  const [formData, handleInputChange, resetForm] = useUserFormData(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/users`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName || "",
          lastName: formData.lastName || "",
          email: formData.email || "",
        }),
      });

      if (response.ok) {
        toast.success("Usuário criado com sucesso");
        resetForm();
      } else {
        toast.error("Erro ao criar o usuário");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Erro ao criar o usuário");
    }
  };

  return (
    <UserFormLayout
      title="Cadastrar Usuário"
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isCreateForm={true}
    />
  );
}
