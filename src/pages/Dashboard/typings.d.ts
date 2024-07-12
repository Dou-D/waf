import type { Statistic } from '@/components/SimpleStatic/StatisticCard/typings';
export interface SiteResponse {
  data: Data;
  message: string;
  status: number;
}

export interface Data {
  res: Res[]
}

export interface Res {
  status: "success" | "processing" | "error" | "warning" | "default";
  title: string;
  value: number | '-';
}