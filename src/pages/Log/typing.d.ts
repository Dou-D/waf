export interface LogResponse {
    data: LogItems[];
    message: string;
    status: number;
}

export interface LogItems {
    code?: number;
    id?: string;
    ip?: string;
    method?: string;
    time?: string;
    url?: string;
}

export interface LogRequest {
    current?: string;
    pageSize?: string;
}
export type TableListItem = {
    key: number;
    name: string;
    containers: number;
    creator: string;
    status: string;
    createdAt: number;
    memo: string;
  };