import { Cam } from "../../../Types/cam.types";
import CreateCamForm from "./CreateCamForm";
import EditCamForm from "./EditCamForm";

interface CamFormProps {
  cam?: Cam | null;
  id?: string;
  isEdit: boolean;
}

export default function CamForm({ cam, id, isEdit }: CamFormProps) {
  return (
    <div>
      {isEdit ? <EditCamForm cam={cam ?? null} id={id} /> : <CreateCamForm />}
    </div>
  );
}
