export interface DataTypeResponse {
  data: Data[];
  success: boolean
  total: number;
}

export interface Data {
  attackType?: string;
  dstIp?: string;
  dstMac?: string;
  dstPort?: string;
  id?: string;
  label?: string;
  payload?: string;
  protocol?: string;
  srcIp?: string;
  srcMac?: string;
  srcPort?: string;
  timestamp?: string;
}
