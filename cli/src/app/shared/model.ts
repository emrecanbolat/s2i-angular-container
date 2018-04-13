export interface Word {
  id: number;
  flag: boolean;
  entries_english: [{ entry: string }];
  entry_hausa: string;
  medias: [ { file: string, id: number }];
  categories: [ { hausa: string, english: string, id: number } ];
}

export interface AdminWord {
  id: number;
  flag: boolean;
  entry_english: string;
  entry_hausa: string;
  medias: [ { file: string, id: number }];
  categories: [ number ];
}

export interface Category {
  id: number;
  flag: boolean;
  hausa: string;
  english: string;
  color: string;
  media: string;
  media_id: number;
}

export interface Media {
  id: number;
  flag: boolean;
  media: string;
}
