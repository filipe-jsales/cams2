import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  deleteUser,
  fetchUsers,
  selectUsers,
} from "../../../../store/slices/userSlice";
import UsersDataTable from "../../../../components/Dashboard/Users/UsersDataTable";

const UsersPage = () => {
  // @ts-expect-error Omitindo o tipo para simplificar
  const { users, loading, error } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRemoveUser = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      dispatch(deleteUser(id));
    }
  };

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p>{error}</p>;

  return <UsersDataTable users={users} onRemoveUser={handleRemoveUser} />;
};

export default UsersPage;
