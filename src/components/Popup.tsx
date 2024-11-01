import React, { useEffect, useRef, useState } from 'react';
import { isImage, isVideo, retrieveFileLink } from '../utils/functions';

type Props = {
  popupContent: string;
  popupPath?: string;
  setPopupContent: React.Dispatch<React.SetStateAction<string | null>>;
  setPopupPath: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Popup = ({
  popupContent,
  setPopupContent,
  setPopupPath,
  popupPath,
}: Props) => {
  const [contentType, setContentType] = useState<
    'picture' | 'video' | undefined
  >();
  const [tempFileLink, setTempFileLink] = useState<string>();
  const close = () => {
    setPopupContent(null);
    setPopupPath(undefined);
  };

  useEffect(() => {
    if (!popupPath) {
      setContentType(undefined);
      return;
    }
    retrieveFileLink(popupPath)
      .then((link) => {
        setTempFileLink(link);
      })
      .catch((err) => alert(`Erreur de récupération: ${err}`));
    if (isImage(popupPath)) {
      setContentType('picture');
    } else {
      setContentType('video');
    }
  }, [popupPath]);

  if (!contentType) return <></>;

  return (
    <div
      className="fixed top-0 left-0 z-80 
				w-screen h-screen bg-black/70 flex 
				justify-center items-center"
      style={{ zIndex: 80 }}
      onClick={(event) => event?.stopPropagation()}
    >
      {contentType === 'picture' && (
        <img
          src={tempFileLink ? tempFileLink : popupContent}
          alt="Popup content"
          style={{ maxHeight: '80%' }}
          onClick={close}
        />
      )}
      {contentType === 'video' && (
        <video
          controls
          autoPlay
          playsInline
          width={'80%'}
          style={{ maxHeight: '80%' }}
          src={tempFileLink}
        />
      )}

      <p className="absolute top-2 mx-auto p-1 rounded text-white hover:text-gray-50 inline-flex items-center">
        {popupPath}
      </p>
      {popupPath !== undefined && popupPath.length > 0 && (
        <a
          className="absolute top-2 left-2 p-1 rounded text-white hover:text-gray-50 inline-flex items-center"
          href={tempFileLink}
        >
          <svg
            className="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
              clipRule="evenodd"
            />
          </svg>
          Download
        </a>
      )}
      <button
        className="absolute top-2 right-2 p-1 rounded text-red-300 hover:text-gray-50 inline-flex items-center"
        onClick={() => close()}
      >
        <svg
          className="w-6 h-6 text-red"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
            clipRule="evenodd"
          />
        </svg>
        Close
      </button>
    </div>
  );
};

export default Popup;
