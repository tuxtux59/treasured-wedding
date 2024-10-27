import React, { useEffect, useState } from 'react';
import TopBar from './MainPanel/TopBar';
import { ItemDisplay, ItemFilter, Slide, WeddingFile } from '../utils/types';
import VerticalCarousel from './carousel/VerticalCarousel';
import { PER_PAGE } from '../utils/generic';
import GridItem from './GridItem';
import BottomBar from './MainPanel/BottomBar';

type Props = {
  files: WeddingFile[];
  filter: ItemFilter;
  filteredFiles: WeddingFile[];
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<WeddingFile[]>>;
  setFilter: React.Dispatch<React.SetStateAction<ItemFilter>>;
};

const MainPanel = ({
  files,
  filter,
  filteredFiles,
  showSidebar,
  setShowSidebar,
  setFiles,
  setFilter,
}: Props) => {
  const [itemDisplay, setItemDisplay] = useState<ItemDisplay>('carousel');
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [filter, itemDisplay]);

  const paneClass = () => {
    return `flex flex-col justify-between w-${
      showSidebar ? '4/5' : 'full'
    } h-full bg-white shadow-lg`;
  };

  useEffect(() => {
    if (filteredFiles.length === 0) return;

    const newSlides = filteredFiles.map((file) => {
      return {
        key: file.id,
        content: file.id,
      };
    }) as Slide[];
    setSlides(newSlides);
  }, [filteredFiles]);

  return (
    <div id="left-section" className={paneClass()}>
      <TopBar
        itemDisplay={itemDisplay}
        setItemDisplay={setItemDisplay}
        setFilter={setFilter}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        setFiles={setFiles}
      />
      <div
        id="items-section"
        className="w-full h-full overflow-hidden relative bg-slate-300"
      >
        {filteredFiles.length > 0 ? (
          <>
            {itemDisplay === 'carousel' ? (
              <VerticalCarousel
                className="h-2/3 w-full overflow-y-scroll"
                slides={slides.length > 0 ? slides : []}
                offsetRadius={2}
                showNavigation={true}
              />
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4"
                style={{ overflowY: 'auto', height: 'calc(100vh - 156px)' }}
              >
                {filteredFiles
                  .slice(
                    currentPage * PER_PAGE,
                    currentPage * PER_PAGE + PER_PAGE
                  )
                  .map((im) => (
                    <GridItem key={im.id} {...im} />
                  ))}
              </div>
            )}
          </>
        ) : (
          <p>Aucun fichier</p>
        )}
      </div>
      <BottomBar
        currentPage={currentPage}
        filteredFiles={filteredFiles}
        files={files}
        itemDisplay={itemDisplay}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default MainPanel;
