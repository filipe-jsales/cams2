import React from "react";
import { toast } from "react-toastify";
import { useCamFormData } from "./useCamFormData";
import CamFormLayout from "./CamFormLayout";
import { Cam } from "../../../Types/cam.types";

interface EditCamFormProps {
  cam: Cam | null;
  id?: string;
}

export default function EditCamForm({ cam, id }: EditCamFormProps) {
  const [formData, handleInputChange] = useCamFormData(cam);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/cams/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          URL: formData.URL,
          protocol: formData.protocol,
          status: formData.status,
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
    <CamFormLayout
      title="Editar Câmera"
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
}
