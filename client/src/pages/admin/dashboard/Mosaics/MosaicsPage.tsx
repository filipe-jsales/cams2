import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  deleteMosaic,
  fetchMosaics,
  selectMosaics,
} from "../../../../store/slices/mosaicsSlice";
import MosaicsDataTable from "../../../../components/Dashboard/Mosaics/MosaicsDataTable";

const MosaicsPage = () => {
  // @ts-expect-error Omitindo o tipo para simplificar
  const { mosaics, loading, error } = useAppSelector(selectMosaics);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMosaics());
  }, [dispatch]);

  const handleRemoveMosaic = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este mosaico?")) {
      dispatch(deleteMosaic(id));
    }
  };

  if (loading) return <p>Carregando mosaicos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <MosaicsDataTable mosaics={mosaics} onRemoveMosaic={handleRemoveMosaic} />
  );
};

export default MosaicsPage;
