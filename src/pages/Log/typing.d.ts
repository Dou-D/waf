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
