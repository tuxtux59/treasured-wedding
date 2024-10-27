import React, { useEffect, useState } from 'react';
import './App.css';

import { getFiles } from './utils/functions';
import { ItemFilter, WeddingFile } from './utils/types';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';

function App() {
  const [filter, setFilter] = useState<ItemFilter>('all');
  const [files, setFiles] = useState<WeddingFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<WeddingFile[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const filteredFiles =
      files.length > 0
        ? files.filter(({ name }) => {
            if (filter === 'all') return true;
            if (filter === 'pictures') return name.endsWith('png');
            if (filter === 'videos') return !name.endsWith('png');
            return false;
          })
        : [];
    setFilteredFiles(filteredFiles);
  }, [files, filter]);

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
      <MainPanel
        files={files}
        filter={filter}
        filteredFiles={filteredFiles}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        setFiles={setFiles}
        setFilter={setFilter}
      />
      {/* right Section */}
      {showSidebar && <Sidebar filteredFiles={filteredFiles} />}
    </div>
  );
}

export default App;
