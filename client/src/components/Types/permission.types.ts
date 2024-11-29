export interface Permission {
  id: number;
  name: string;
  isDefault?: boolean;
  isActive?: boolean;
  observations?: string;
}
