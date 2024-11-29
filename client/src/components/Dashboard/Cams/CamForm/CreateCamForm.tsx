import React from "react";
import { toast } from "react-toastify";
import { useCamFormData } from "./useCamFormData";
import CamFormLayout from "./CamFormLayout";

export default function CreateCamForm() {
  const [formData, handleInputChange, resetForm] = useCamFormData(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/cams`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
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
        toast.success("Câmera criada com sucesso");
        resetForm();
      } else {
        toast.error("Erro ao criar a câmera");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Erro ao criar a câmera");
    }
  };

  return (
    <CamFormLayout
      title="Criar Câmera"
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isCreateForm={true}
    />
  );
}
