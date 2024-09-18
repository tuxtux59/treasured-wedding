import React from 'react';
import './App.css';

import { humanPakageName, pkgVersion } from './utils/generic';
import VerticalCarousel from './components/carousel/VerticalCarousel';
import { config } from 'react-spring';

function App() {
  console.debug(humanPakageName);
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
            <div className="flex flex-col h-4/5 w-full items-center justify-center">
              <VerticalCarousel
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
          <div className="w-2/3 h-2/3 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center">
            <div className="space-y-8 text-center">
              <div className="p-4 bg-white shadow rounded-lg">10h12</div>
              <div className="p-4 bg-white shadow rounded-lg">20h42</div>
              <div className="p-4 bg-white shadow rounded-lg">6 Oct</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
