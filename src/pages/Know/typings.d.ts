declare namespace Know {
  export interface KnowRequest {
    pageSize: number;
    current: number;
  }
  export interface KnowResponse {
    data: KnowItems[];
    message: string;
    status: number;
  }

  export interface KnowItems {
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
  }
}
