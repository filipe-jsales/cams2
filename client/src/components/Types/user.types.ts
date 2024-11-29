import { Role } from "./role.types";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  type?: string;
  isActive?: boolean;
  publicCameras?: boolean;
  recoveryCode?: string | null;
  createdAt?: string;
  updatedAt?: string;
  roles?: Role[];
  status?: string;
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
