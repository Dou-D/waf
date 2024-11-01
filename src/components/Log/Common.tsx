import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import request from 'umi-request';
import { pagination } from '@/common';


const commonColumns: ProColumns<Log.FlowItems>[] = [
    {
        dataIndex: "id",
        valueType: "indexBorder"
    },
    {
        title: "ip地址",
        dataIndex: "ip",
    },
    {
        title: "请求方式",
        dataIndex: "method",
    },
    {
        title: '链接',
        dataIndex: 'url',

    },
    {
        title: "响应状态",
        dataIndex: 'code',
    },
    {
        title: "请求时间",
        dataIndex: 'time',
    }
];
export const CommonLogTable: React.FC = () => {
    return (
        <ProTable<Log.FlowItems>
            request={async (param) => {
                const response = await request<Log.CommonResponse>('/api/log/common', {
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
            columns={commonColumns}
            rowKey="key"
            pagination={pagination}
            search={false}
            dateFormatter="string"
        />
    );
};
