import React, { useCallback, useEffect, useState } from 'react';
import { getThumbnails } from '../utils/functions';

type Props = {
  id: string;
  name: string;
  path_display: string;
  setPopupContent: React.Dispatch<React.SetStateAction<string | null>>;
  setPopupPath: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const GridItem = ({
  id,
  name,
  setPopupContent,
  setPopupPath,
  path_display,
}: Props) => {
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      getThumbnails(id, setData);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!data) return <></>;

  const handleClick = () => {
    setPopupContent(data);
    setPopupPath(path_display);
  };

  return (
    <img
      src={data}
      alt={name}
      onClick={() => handleClick()}
      className="rounded border-white border-8 bg-slate-100"
    />
  );
};

export default GridItem;
