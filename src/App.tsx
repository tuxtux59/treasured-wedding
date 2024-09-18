import React from 'react';
import './App.css';

import { humanPakageName, pkgVersion } from './utils/generic';
import VerticalCarousel from './components/carousel/VerticalCarousel';
import { config } from 'react-spring';
import { Chrono } from 'react-chrono';

function App() {
  const items = [
    {
      title: 'May 1940',
      cardTitle: 'Dunkirk',
      url: 'http://www.history.com',
      cardSubtitle:
        'Men of the British Expeditionary Force (BEF) wade out to..',
      cardDetailedText:
        'Men of the British Expeditionary Force (BEF) wade out to..',
    },
    {
      title: 'May 1941',
      cardTitle: 'Dunkirk',
      url: 'http://www.history.com',
      cardSubtitle:
        'Men of the British Expeditionary Force (BEF) wade out to..',
      cardDetailedText:
        'Men of the British Expeditionary Force (BEF) wade out to..',
    },
  ];

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
          <button className="hover:bg-blue-500 p-2 rounded">
            Carousel View
          </button>
          <button className="hover:bg-blue-500 p-2 rounded">Grid View</button>
          <button className="hover:bg-blue-500 p-2 rounded">Refresh</button>
          <div>
            <button className="hover:bg-blue-500 p-2 rounded">
              Only Pictures
            </button>
            <button className="hover:bg-blue-500 p-2 rounded">
              Only Videos
            </button>
          </div>
        </div>
        <div
          id="items-section"
          className="w-full h-full overflow-hidden relative"
        >
          <div className="h-full w-full overflow-y-scroll bg-slate-200">
            <VerticalCarousel
              className="h-2/3 w-full overflow-y-scroll"
              slides={[1, 2, 3, 4].map((k) => {
                return {
                  key: k,
                  content: (
                    <img
                      src="https://via.placeholder.com/150"
                      alt="sample img"
                      className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                  ),
                };
              })}
              offsetRadius={2}
              showNavigation={true}
              config={config.gentle}
            />
          </div>
        </div>
        <div
          id="bottom-bar"
          className="w-full bg-blue-600 text-white tex-center"
        >
          Bottom
        </div>
      </div>
      {/* right Section */}
      <div id="right-section" className="flex-grow h-full flex">
        {/* Scrollable Timeline */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="h-full p-2 w-full items-center justify-center flex">
            <div className="w-full h-full p-4 bg-gray-50 rounded-lg shadow-lg flex items-center justify-center">
              <Chrono
                items={items}
                className="py-4 my-4"
                mode="VERTICAL"
                scrollable
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
