import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import request from 'umi-request';
import { pagination } from '@/common';

const banColumns: ProColumns<Log.BanIpItems>[] = [
  {
    dataIndex: "id",
    valueType: "indexBorder"
  },
  {
    title: "操作者",
    dataIndex: 'operationID',
    renderText: () => "admin",
  },
  {
    title: "操作IP",
    dataIndex: 'targetIP',
  },
  {
    title: "请求时间",
    dataIndex: 'time',
    valueType: "dateTime"
  }
];

export const BanLogTable = () => {
  return (
    <ProTable<Log.BanIpItems>
      request={async (param) => {
        const response = await request<Log.BanIpResponse>('/api/log/ban_ip_log', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
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

