import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { deleteCam, fetchCams, selectCams } from "../../../../store/slices/camsSlice";
import CamsDataTable from "../../../../components/Dashboard/Cams/CamsDataTable";

const CamsPage = () => {
  // @ts-expect-error Omitindo o tipo para simplificar
  const { cams, loading, error } = useAppSelector(selectCams);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCams());
  }, [dispatch]);

  const handleRemoveCam = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta câmera?")) {
      dispatch(deleteCam(id));
    }
  };

  if (loading) return <p>Carregando câmeras...</p>;
  if (error) return <p>{error}</p>;

  return <CamsDataTable cams={cams} onRemoveCam={handleRemoveCam} />;
};

export default CamsPage;
