declare namespace Attack {

  export interface DescriptionResponse {
    data: DescriptionItems;
    message: string;
    status: number;
  }

  export interface DescriptionItems {
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
    UpdatedAt: string;
  }
}
