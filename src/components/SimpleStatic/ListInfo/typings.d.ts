declare namespace ListInfo {
  export interface ListResponse {
    data: Items[];
    message: string;
    status: number;
    [property: string]: any;
  }

  export interface Items {
    id: string;
    name: string;
    process: number;
    [property: string]: any;
  }
}
