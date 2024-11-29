import { User } from "../../../Types/user.types";
import CreateUserForm from "./CreateUserForm";
import EditUserForm from "./EditUserForm";

interface UserFormProps {
  user?: User | null;
  id?: string;
  isEdit: boolean;
}

export default function UserForm({ user, id, isEdit }: UserFormProps) {
  return (
    <div>
      {isEdit ? (
        <EditUserForm user={user ?? null} id={id} />
      ) : (
        <CreateUserForm />
      )}
    </div>
  );
}
