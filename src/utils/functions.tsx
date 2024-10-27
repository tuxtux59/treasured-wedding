import { DpbxFile, ThumbnailCache, WeddingFile } from './types';

export const isImage = (path: string): boolean => {
  return path.endsWith('png');
};
export const isVideo = (path: string): boolean => {
  return !isImage(path);
};

export const getFiles = async () => {
  const url = 'https://api.dropboxapi.com/2/files/list_folder';
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_DPBX_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path: '',
      limit: 1000,
      include_media_info: true,
    }),
  })
    .then((response) => response.json())
    .then((jsonData) => {
      return jsonData.entries
        .map((entry: DpbxFile) => ({ ...entry } as WeddingFile))
        .sort((a: WeddingFile, b: WeddingFile) => {
          const shortModifA = a.client_modified.split('T')[0];
          const shortModifB = b.client_modified.split('T')[0];
          if (shortModifA < shortModifB) return -1;
          if (shortModifA > shortModifB) return 1;
          return 0;
        });
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

const thumbnailsCache: ThumbnailCache = {};

export const getThumbnails = (filePath: string, callback?: any) => {
  if (thumbnailsCache[filePath]) {
    callback(thumbnailsCache[filePath]);
    return;
  }
  const url = 'https://content.dropboxapi.com/2/files/get_thumbnail_v2';
  const params = {
    authorization: `Bearer ${process.env.REACT_APP_DPBX_TOKEN}`,
    reject_cors_preflight: 'true',
    arg: JSON.stringify({
      resource: {
        '.tag': 'path',
        path: `${filePath}`,
      },
      format: {
        '.tag': 'png',
      },
      size: {
        '.tag': 'w1024h768',
      },
    }),
  };
  try {
    return fetch(url + '?' + new URLSearchParams(params), {
      method: 'POST',
    })
      .then((d) => d.body)
      .then((body) => new Response(body))
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const readerResult = reader.result;
          thumbnailsCache[filePath] = readerResult;
          callback(readerResult);
        };
      });
  } catch (error) {
    console.error(error);
  }
};

export const retrieveFileLink = async (dropboxPath: string) => {
  return fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_DPBX_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path: dropboxPath,
    }),
  })
    .then((response) => response.json())
    .then((data) => data.link)
    .catch((error) => console.error('Erreur :', error));
};
