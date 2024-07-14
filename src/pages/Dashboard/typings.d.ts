import type { Statistic } from '@/components/SimpleStatic/StatisticCard/typings';
export interface SiteResponse {
  data: SiteData;
  message: string;
  status: number;
}

export interface SiteData {
  res: Res[];
}

export interface Res {
  status: 'success' | 'processing' | 'error' | 'warning' | 'default';
  title: string;
  value: number | '-';
}

export interface SiteInfoResponse {
  data: SiteInfoData;
  message: string;
  status: number;
}

export interface SiteInfoData {
  accessData: SiteInfoItem[];
}

export interface SiteInfoItem {
  status: string;
  title: string;
  value: number;
}
