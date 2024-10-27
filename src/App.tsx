import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

import {
  getFiles,
  isImage,
  isVideo,
  retrieveFileLink,
} from './utils/functions';
import { ItemFilter, WeddingFile } from './utils/types';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import Popup from './components/Popup';

function App() {
  const [filter, setFilter] = useState<ItemFilter>('all');
  const [files, setFiles] = useState<WeddingFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<WeddingFile[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [popupContent, setPopupContent] = useState<string | null>(null);
  const [popupPath, setPopupPath] = useState<string | undefined>();

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setPopupContent(null);
      setPopupPath(undefined);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {
    const filteredFiles =
      files.length > 0
        ? files.filter(({ name }) => {
            if (filter === 'all') return true;
            if (filter === 'pictures') return isImage(name);
            if (filter === 'videos') return isVideo(name);
            return false;
          })
        : [];
    setFilteredFiles(filteredFiles);
  }, [files, filter]);

  useEffect(() => {
    if (files.length === 0) {
      getFiles()
        .then((res) => {
          setFiles(
            res.sort((a: WeddingFile, b: WeddingFile) => {
              const dateA = Date.parse(a.client_modified);
              const dateB = Date.parse(b.client_modified);
              return dateA - dateB;
            })
          );
        })
        .catch((err) => {
          console.error(err);
          setFiles([]);
        });
    }
  }, [files]);

  useEffect(() => {
    if (files.length > 0) {
      const file = files[0];
      console.debug('file', file.path_display);
      retrieveFileLink(file.path_display)
        .then((resp) => console.debug('resp', resp))
        .catch((err) => console.error(err));
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
        setPopupContent={setPopupContent}
        setPopupPath={setPopupPath}
      />
      {/* right Section */}
      {showSidebar && <Sidebar filteredFiles={filteredFiles} />}
      {popupContent && (
        <Popup
          popupContent={popupContent}
          setPopupContent={setPopupContent}
          popupPath={popupPath}
          setPopupPath={setPopupPath}
        />
      )}
    </div>
  );
}

export default App;
