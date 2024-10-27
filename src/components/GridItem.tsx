import React, { useCallback, useEffect, useState } from 'react';
import { getThumbnails } from '../utils/functions';

type Props = { id: string; name: string };

const GridItem = ({ id, name }: Props) => {
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

  return (
    <img
      src={data}
      alt={name}
      className="rounded border-white border-8 bg-slate-100"
    />
  );
};

export default GridItem;
