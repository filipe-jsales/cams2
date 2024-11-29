import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Cam } from "../../../../components/Types/cam.types";
import CamForm from "../../../../components/Dashboard/Cams/CamForm/CamForm";

export default function EditCamPage() {
  const { id } = useParams();
  const [cam, setCam] = useState<Cam | null>(null);

  const isEdit = !!id;

  useEffect(() => {
    const fetchCamById = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/cams/${id}`
        );
        setCam(response.data);
      } catch (error) {
        console.error("Erro ao buscar câmera:", error);
      }
    };

    fetchCamById();
  }, [id]);

  return (
    <div>
      <CamForm cam={cam} id={id} isEdit={isEdit} />
    </div>
  );
}
