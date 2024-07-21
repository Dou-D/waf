declare namespace Know {
  export interface KnowRequest {
    pageSize: number;
    current: number;
  }
  export interface KnowResponse {
    data: KnowData;
    message: string;
    status: number;
}

export interface KnowData {
    list: ListItems[];
    total: number;
    [property: string]: any;
}

export interface ListItems {
    CreatedAt: string;
    cve_id: string;
    DeletedAt: null;
    ID: number;
    name: string;
    payload: string;
    port: string;
    protocol: string;
    requestBody: string;
    requestHeader: string;
    requestMethod: string;
    requestUrl: string;
    responseBody: string;
    responseHeader: string;
    responseStatus: string;
    type: string;
    UpdatedAt: string;
    [property: string]: any;
}
}
