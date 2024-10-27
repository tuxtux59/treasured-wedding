import React, { useEffect, useState } from 'react';
import { ItemDisplay, WeddingFile } from '../../utils/types';
import Pagination from './Pagination';
import { PER_PAGE } from '../../utils/generic';

type Props = {
  itemDisplay: ItemDisplay;
  files: WeddingFile[];
  filteredFiles: WeddingFile[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const BottomBar = ({
  currentPage,
  files,
  filteredFiles,
  itemDisplay,
  setCurrentPage,
}: Props) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    filteredFiles.length > 0
      ? setTotalPages(Math.floor(filteredFiles.length / PER_PAGE))
      : setTotalPages(0);
  }, [filteredFiles]);

  return (
    <div
      id="bottom-bar"
      className="w-full bg-blue-600 text-white tex-center h-auto"
    >
      {itemDisplay === 'grid' && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
      {filteredFiles.length > 0 && `${filteredFiles.length}/${files.length}`}
    </div>
  );
};

export default BottomBar;
