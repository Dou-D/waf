declare namespace AttackComponent {
  export interface AttackResponse {
    data: AttackItems[];
    message: string;
    status: number;
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
  export interface AssetsResponse {
    data: AssetsData;
    message: string;
    status: number;
  }

  export interface AssetsData {
    list: ListItems[];
    total: number;
  }

  export interface ListItems {
    Address?: string;
    DNS?: string;
    id?: string;
    Mac?: string;
    Netbios?: string;
    SNMP?: string;
    Time?: string;
  }
}
