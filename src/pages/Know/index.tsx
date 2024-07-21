import { pagination } from '@/common';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { memo } from 'react';
import request from 'umi-request';

const columns: ProColumns<Know.ListItems>[] = [
  {
    dataIndex: "ID",
    valueType: "indexBorder",
    width: 48,
  },
  {
    title: '名称',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: '协议',
    dataIndex: 'protocol',
    width: 48
  },
  {
    title: '载荷',
    dataIndex: 'payload',
  },
  {
    title: '请求方法',
    dataIndex: 'requestMethod',
    width: 90
  },
  {
    title: '状态码',
    dataIndex: "responseStatus"
  },
  {
    title: '创建时间',
    dataIndex: 'CreatedAt',
    valueType: "dateTime"
  },
  {
    title: '更新时间',
    dataIndex: 'UpdatedAt',
    valueType: "dateTime"
  }
];

const know: React.FC = () => {
  return (
   <>
     <ProTable<Know.ListItems>
      columns={columns}
      request={async (param) => {
        const res = await request<Know.KnowResponse>('/api/pocList', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            ...param,
          }
        })
        return {
          data: res.data.list,
          success: true,
          total: res.data.total,
        }
      }}
      rowKey="key"
      pagination={pagination}
      search={false}
      dateFormatter="string"
      headerTitle="攻击概览"
    />
   </>
  );
};

export default memo(know);