import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { FlowItems, CommonResponse } from './typing';
import request from 'umi-request';

const commonColumns: ProColumns<FlowItems>[] = [
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
export const CommonLogTable:React.FC = () => {
    return (
        <ProTable<FlowItems>
            request={async (param) => {
                const response = await request<CommonResponse>('/api/log/common', {
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
            pagination={{
                pageSize: 5,
                showSizeChanger: true,
            }}
            search={false}
            dateFormatter="string"
        />
    );
};
