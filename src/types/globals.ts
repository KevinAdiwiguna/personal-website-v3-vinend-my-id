export const ITEMS_PER_PAGE = 15;

export interface QueryParamsProps {
  query: string;
  page: number;
}

export type ResponseState = {
  status: number;
  message: string;
  timeStamp: Date;
  data?: any;
};
