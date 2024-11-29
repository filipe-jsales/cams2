import { useEffect, useState } from "react";
import { User } from "../../../Types/user.types";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  publicCameras: boolean;
  password: string;
  confirmPassword: string;
  type: string;
  rg: string;
  cpf: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
  observations: string;
}

export function useUserFormData(
  user: User | null
): [
  FormData,
  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  () => void
] {
  const initialFormData: FormData = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    isActive: user?.isActive || true,
    publicCameras: user?.publicCameras || false,
    password: "",
    confirmPassword: "",
    type: user?.type || "Pessoa Física",
    rg: user?.rg || "",
    cpf: user?.cpf || "",
    cep: user?.cep || "",
    state: user?.state || "",
    city: user?.city || "",
    neighborhood: user?.neighborhood || "",
    street: user?.street || "",
    number: user?.number || "",
    complement: user?.complement || "",
    observations: user?.observations || "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        isActive: true,
        publicCameras: false,
        password: "",
        confirmPassword: "",
        type: "Pessoa Física",
        rg: user?.rg || "",
        cpf: user?.cpf || "",
        cep: user?.cep || "",
        state: user?.state || "",
        city: user?.city || "",
        neighborhood: user?.neighborhood || "",
        street: user?.street || "",
        number: user?.number || "",
        complement: user?.complement || "",
        observations: user?.observations || "",
      });
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // @ts-expect-error - TS doesn't know that all inputs have a name property
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "active" : "inactive") : value,
    }));
  };

  const resetForm = () => setFormData(initialFormData);

  return [formData, handleInputChange, resetForm];
}
