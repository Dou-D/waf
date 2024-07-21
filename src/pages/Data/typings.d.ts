declare namespace PageData {
  export type ToolBarType = '正常' | '可疑' | '攻击';
  type LabelColor = 'error' | 'success' | 'warning';

  export interface FlowListResponse {
    data: Data;
    message: string;
    status: number;
  }

  export interface Data {
    flows: FlowListItems[];
    total: number;
  }

  export interface FlowListItems {
    id: string;
    attackType: string;
    dstIp: string;
    dstMac: string;
    dstPort: string;
    label: string;
    payload: string;
    protocol: string;
    time: string;
    srcIp: string;
    srcMac: string;
    httpPayload: string;
    srcPort: string;
    timestamp: string;
  }
}
