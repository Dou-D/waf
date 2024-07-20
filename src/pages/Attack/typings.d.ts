declare namespace Attack {
  export interface AttackResponse {
    data: AttackItems[];
    message: string;
    status: number;
    [property: string]: any;
  }

  export interface AttackItems {
    attackType: string;
    dstIp: string;
    dstMac: string;
    dstPort: string;
    httpPayload: string;
    id: string;
    label: string;
    payload: string;
    pocId: string;
    protocol: string;
    srcIp: string;
    srcMac: string;
    srcPort: string;
    time: string;
    timestamp: number;
  }
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
