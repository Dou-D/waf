import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { BanIpItems, BanIpResponse } from './typing';
import request from 'umi-request';
import { pagination } from '@/common';

const banColumns: ProColumns<BanIpItems>[] = [
  {
    dataIndex: "id",
    valueType: "indexBorder"
  },
  {
    title: "操作者ID",
    dataIndex: 'operationID',
  },
  {
    title: "操作IP",
    dataIndex: 'targetIP',
  },
  {
    title: "请求时间",
    dataIndex: 'time',
    valueType: "date"
  }
];

export const BanLogTable = () => {
  return (
    <ProTable<BanIpItems>
      request={async (param) => {
        const response = await request<BanIpResponse>('/api/log/ban_ip_log', {
          params: {
            ...param,
          },
        });
        return {
          data: response.data.logs,
          success: true,
          total: response.data.total
        };
      }}
      columns={banColumns}
      rowKey="key"
      pagination={pagination}
      search={false}
      dateFormatter="string"
    />
  );
};

