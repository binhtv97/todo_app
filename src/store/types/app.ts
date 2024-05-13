export interface IApp {
  [key: string]: ITodo[];
}

export type TStatus = 'Finish' | 'Doing' | 'Pending' | 'Critical' | 'Need Todo';
export interface ITodo {
  title?: string;
  time_create?: string;
  time_stam_end?: number;
  time_start?: string;
  status?: TStatus;
  noti?: boolean;
  comment?: string;
  id?: string;
}
