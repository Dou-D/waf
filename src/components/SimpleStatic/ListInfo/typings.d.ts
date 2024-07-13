export interface ListResponse {
  data: Data;
  message: string;
  status: number;
}

export interface Data {
  pageList: PageList;
}

export interface PageList {
  defaultData: DefaultDatum[];
  total: number;
}

export interface DefaultDatum {
  id: string;
  name: string;
  process: number;
}
