export interface Response {
  data: Data;
  message: string;
  status: number;
}

export interface Data {
  flowLine: FlowLine[];
}

export interface FlowLineType {
  month: string;
  value: number | number;
}
