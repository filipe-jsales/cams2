import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { User } from "../../../../components/Types/user.types";
import UserForm from "../../../../components/Dashboard/Users/UserForm/UserForm";

export default function EditUserPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  const isEdit = !!id;

  useEffect(() => {
    const fetchCamById = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/${id}`
        );
        setUser(response.data);
      } catch (error) {
        toast.error(`Erro ao buscar usuário: ${error}`);
      }
    };

    fetchCamById();
  }, [id]);

  return (
    <div>
      <UserForm user={user} id={id} isEdit={isEdit} />
    </div>
  );
}
