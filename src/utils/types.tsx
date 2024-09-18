export interface DpbxFile {
  '.tag': 'file';
  name: string;
  path_display: string;
  client_modified: string;
  content_hash: string;
  id: string;
  is_downloadable: true;
  size: number;
}

export type WeddingFile = Pick<
  DpbxFile,
  | '.tag'
  | 'name'
  | 'path_display'
  | 'id'
  | 'content_hash'
  | 'client_modified'
  | 'is_downloadable'
  | 'size'
>;

export type Slide = {
  key: any;
  content: any;
};

export interface GroupedItems {
  [key: string]: WeddingFile[];
}
