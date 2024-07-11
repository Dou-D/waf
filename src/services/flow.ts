import { config } from '@/utils';
import request from 'umi-request';

/**
 * 
 * @param data 
 * @returns Promise<any>
 */
export function APIManualBan(ip: string) {
  return request('/manualBan', {
    method: 'POST',
    ...config,
    ip,
  });
}

export function APIChangeFlow({flowID, status}) {
  return request('/api/changeFlow', {
    method: 'POST',
    ...config,
    data: {
      flowID,
      status
    }
  })
}
