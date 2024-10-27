import React, { useEffect, useState } from 'react';
import './App.css';

import { humanPakageName, pkgVersion } from './utils/generic';
import VerticalCarousel from './components/carousel/VerticalCarousel';
import { config } from 'react-spring';
import { Chrono } from 'react-chrono';
import { getFiles } from './utils/functions';
import { GroupedItems, Slide, WeddingFile } from './utils/types';
import { TimelineItemModel } from 'react-chrono/dist/models/TimelineItemModel';

function App() {
  const [itemDisplay, setItemDisplay] = useState<'carousel' | 'grid'>(
    'carousel'
  );
  const [filter, setFilter] = useState<'all' | 'pictures' | 'videos'>('all');
  const [files, setFiles] = useState<WeddingFile[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [timelineItems, setTimelineItems] = useState<TimelineItemModel[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<WeddingFile[]>([]);

  useEffect(() => {
    console.debug('files', files);
    const filteredFiles =
      files.length > 0
        ? files.filter(({ name }) => {
            if (filter === 'all') return true;
            if (filter === 'pictures') return name.endsWith('png');
            if (filter === 'videos') return !name.endsWith('png');
            return false;
          })
        : [];
    console.debug(
      'filtering',
      filter,
      files.length,
      filteredFiles.length,
      filteredFiles.map((f) => f.name)
    );
    setFilteredFiles(filteredFiles);
  }, [files, filter]);

  useEffect(() => {
    if (filteredFiles.length === 0) return;

    const newSlides = filteredFiles.map((file) => {
      return {
        key: file.id,
        content: file.id,
      };
    }) as Slide[];
    setSlides(newSlides);

    const newTimelineItems = filteredFiles.map((file) => {
      const title = file.client_modified.split('T')[0];
      return {
        id: file.id,
        title: title,
        cardTitle: title,
        url: '#',
        cardSubtitle: title,
        cardDetailedText: title,
      };
    }) as TimelineItemModel[];

    setTimelineItems(newTimelineItems);

    const initialValue: GroupedItems = {};

    const reducedValues = filteredFiles.reduce(
      (acc: GroupedItems, current: WeddingFile) => {
        const date = new Date(current.client_modified);
        const minute = Math.floor(date.getMinutes() / 20) * 20; // 20-minute interval
        const hour = date.getHours();
        const key = `${date.toISOString().split('T')[0]}${hour
          .toString()
          .padStart(2, '0')}${minute.toString().padStart(2, '0')}`;
        acc[key] = (acc[key] || []).concat(current);
        return acc;
      },
      initialValue
    );

    console.debug('reduced', reducedValues);
  }, [filteredFiles]);

  useEffect(() => {
    if (files.length === 0) {
      getFiles()
        .then((res) => {
          setFiles(res);
        })
        .catch((err) => {
          console.error(err);
          setFiles([]);
        });
    }
  }, [files]);
  return (
    <div className="App h-screen w-screen bg-gray-100 flex">
      {/* Left Section */}
      <div
        id="left-section"
        className="flex flex-col justify-between w-4/5 h-full bg-white shadow-lg"
      >
        <div
          id="topbar"
          className="w-full bg-blue-600 text-white p-4 flex justify-between"
        >
          <h2 className="p-2 font-extrabold flex">
            {humanPakageName}
            <pre className="text-sm bg-white text-black px-1 rounded ml-2">
              <code>{pkgVersion}</code>
            </pre>
          </h2>
          <button
            className="hover:bg-blue-500 p-2 rounded"
            disabled={itemDisplay === 'carousel'}
            onClick={() => setItemDisplay('carousel')}
          >
            Carousel View
          </button>
          <button
            className="hover:bg-blue-500 p-2 rounded"
            disabled={itemDisplay === 'grid'}
            onClick={() => setItemDisplay('grid')}
          >
            Grid View
          </button>
          <button
            className="hover:bg-blue-500 p-2 rounded"
            onClick={() => setFiles([])}
          >
            Refresh
          </button>
          <div>
            <button
              className="hover:bg-blue-500 p-2 rounded"
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className="hover:bg-blue-500 p-2 rounded"
              onClick={() => setFilter('pictures')}
            >
              Only Pictures
            </button>
            <button
              className="hover:bg-blue-500 p-2 rounded"
              onClick={() => setFilter('videos')}
            >
              Only Videos
            </button>
          </div>
        </div>
        <div
          id="items-section"
          className="w-full h-full overflow-hidden relative"
        >
          <div className="h-full w-full overflow-y-scroll bg-slate-200">
            {filteredFiles.length > 0 ? (
              <>
                {itemDisplay === 'carousel' ? (
                  <VerticalCarousel
                    className="h-2/3 w-full overflow-y-scroll"
                    slides={slides.length > 0 ? slides : []}
                    offsetRadius={2}
                    showNavigation={true}
                    // config={config.gentle}
                  />
                ) : (
                  <>
                    <p>Grid in progress</p>
                  </>
                )}
              </>
            ) : (
              <p>No files</p>
            )}
          </div>
        </div>
        <div
          id="bottom-bar"
          className="w-full bg-blue-600 text-white tex-center h-11"
        >
          {filteredFiles.length > 0 &&
            `${filteredFiles.length}/${files.length}`}
        </div>
      </div>
      {/* right Section */}
      <div id="right-section" className="flex-grow h-full flex">
        {/* Scrollable Timeline */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="h-full p-2 w-full items-center justify-center flex">
            <div className="w-full h-full p-4 bg-gray-50 rounded-lg shadow-lg flex items-center justify-center">
              {timelineItems.length > 0 && (
                <Chrono
                  items={timelineItems}
                  className="py-4 my-4"
                  mode="VERTICAL"
                  scrollable
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
