import React from "react";
import { toast } from "react-toastify";
import { useUserFormData } from "./useUserFormData";
import { User } from "../../../Types/user.types";
import UserFormLayout from "./UserFormLayout";

interface EditUserFormProps {
  user: User | null;
  id?: string;
}

export default function EditUserForm({ user, id }: EditUserFormProps) {
  const [formData, handleInputChange] = useUserFormData(user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/users/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName || "",
          lastName: formData.lastName || "",
          email: formData.email || "",
          isActive: formData.isActive,
          publicCameras: formData.publicCameras || false,
          password: formData.password || "",
          confirmPassword: formData.confirmPassword || "",
          type: formData.type || "Pessoa Física",
          rg: formData.rg || "",
          cpf: formData.cpf || "",
          cep: formData.cep || "",
          state: formData.state || "",
          city: formData.city || "",
          neighborhood: formData.neighborhood || "",
          street: formData.street || "",
          number: formData.number || "",
        }),
      });

      if (response.ok) {
        toast.success("Dados atualizados com sucesso");
      } else {
        toast.error("Erro ao atualizar os dados");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Erro ao atualizar os dados");
    }
  };

  return (
    <UserFormLayout
      title="Editar Usuário"
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
}
