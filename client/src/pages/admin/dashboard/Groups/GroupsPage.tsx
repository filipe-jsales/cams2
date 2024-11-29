import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  deleteGroup,
  fetchGroups,
  selectGroups,
} from "../../../../store/slices/groupsSlice";
import GroupsDataTable from "../../../../components/Dashboard/Groups/GroupsDataTable";

export default function GroupsPage() {
  // @ts-expect-error Omitindo o tipo para simplificar
  const { groups, loading, error } = useAppSelector(selectGroups);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleRemoveGroup = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este grupo?")) {
      dispatch(deleteGroup(id));
    }
  };

  if (loading) return <p>Carregando grupos...</p>;
  if (error) return <p>{error}</p>;

  return <GroupsDataTable groups={groups} onRemoveGroup={handleRemoveGroup} />;
}
