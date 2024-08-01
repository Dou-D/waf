import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import request from 'umi-request';
import { pagination } from '@/common';
import dayjs from 'dayjs';

const manualColumns: ProColumns<Log.ManualItems>[] = [
    {
        dataIndex: "id",
        valueType: "indexBorder"
    },
    {
        title: "操作者",
        dataIndex: "operationID",
        renderText: () => "admin",
    },
    {
        title: "判断类型",
        dataIndex: "judgmentType",
    },
    {
        title: '方式',
        dataIndex: 'action',
    },
    {
        title: "操作时间",
        dataIndex: 'timestamp',
        valueType: "dateTime",
        renderText: (text) => dayjs(text * 1000).format('YYYY-MM-DD HH:mm:ss'),
    }
];

export const ManualLogTable = () => {
  return (
    <ProTable<Log.ManualItems>
      request={async (param) => {
        const response = await request<Log.ManualResponse>('/api/log/manual_log', {
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
      columns={manualColumns}
      rowKey="key"
      pagination={pagination}
      search={false}
      dateFormatter="string"
    />
  );
};
