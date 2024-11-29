import { useEffect, useState } from "react";
import axios from "axios";
import PermissionsDataTable from "../../../../components/Dashboard/Permissions/PermissionsDataTable";
import { Permission } from "../../../../components/Types/permission.types";

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/roles`
        );
        setPermissions(response.data);
      } catch (error) {
        console.error("Erro ao buscar roles:", error);
      }
    };

    fetchUsers();
  }, []);

  return <PermissionsDataTable permissions={permissions} />;
}
