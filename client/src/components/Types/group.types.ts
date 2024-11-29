export interface Group {
  id: number;
  name: string;
  usersQuantity: number;
  isDefault?: boolean;
  isActive?: boolean;
  observations?: string;
}
