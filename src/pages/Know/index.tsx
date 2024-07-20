import { pagination } from '@/common';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { memo } from 'react';
import request from 'umi-request';

const columns: ProColumns<Know.KnowItems>[] = [
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
  },
  {
    title: '载荷',
    dataIndex: 'payload',
  },
  {
    title: '请求方法',
    dataIndex: 'requestMethod',
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
     <ProTable<Know.KnowItems>
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
          data: res.data,
          success: true,
          // total: res.data,
        }
      }}
      rowKey="key"
      pagination={pagination}
      search={false}
      dateFormatter="string"
      headerTitle="表格标题"
    />
   </>
  );
};

export default memo(know);