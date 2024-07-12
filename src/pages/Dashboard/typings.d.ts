import { Statistic } from '@/components/SimpleStatic/typings';

export interface ResponseType {
  data: ResponseData;
  message: string;
  status: number;
}

export interface ResponseData {
    accessData?: Statistic[]
    successRate?: Statistic[]
    errorRate?: Statistic[]
}