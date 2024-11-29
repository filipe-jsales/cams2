import { useEffect, useState } from "react";
import { Cam } from "../../../Types/cam.types";

interface FormData {
  name: string;
  URL: string;
  protocol: string;
  status: string;
}

export function useCamFormData(
  cam: Cam | null
): [
  FormData,
  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  () => void
] {
  const initialFormData: FormData = {
    name: cam?.name || "",
    URL: cam?.URL || "",
    protocol: cam?.protocol || "RTSP",
    status: cam?.status || "inactive",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    if (cam) {
      setFormData({
        name: cam.name || "",
        URL: cam.URL || "",
        protocol: cam.protocol || "RTSP",
        status: cam.status || "inactive",
      });
    }
  }, [cam]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // @ts-expect-error - TS doesn't know that all inputs have a name property
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "active" : "inactive") : value,
    }));
  };

  const resetForm = () => setFormData(initialFormData);

  return [formData, handleInputChange, resetForm];
}
