export type TrendType = 'up' | 'down' | undefined;

export interface FlowCardResponse {
  status: number;
  message: string;
  data: Data
}

export interface Data {
  flowCardData: FlowCardData[];
}

export interface FlowCardData {
  description: Description;
  id: number;
  title: string;
  value: number;
}

export interface Description {
  title: string;
  trend: TrendType;
  value: string;
}