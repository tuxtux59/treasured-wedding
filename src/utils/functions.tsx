import { DpbxFile, WeddingFile } from './types';

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

const thumbnailsCache = {};

export const getThumbnails = (filePath: string, callback?: any) => {
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
  return fetch(url + '?' + new URLSearchParams(params), {
    method: 'POST',
  });
};