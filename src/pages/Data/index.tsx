import { APIChangeFlow, APIManualBan } from '@/services';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Select, Space, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import request from 'umi-request';
import { GithubIssueItem, LabelColor, ToolBarType } from './typings';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const selectLabelColor = (label: string): LabelColor => {
  if (label === '正常流量') return 'success';
  else if (label === '可疑流量') return 'warning';
  return 'error';
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [activeKey, setActiveKey] = useState<ToolBarType>('正常流量');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [detailData, setDetailData] = useState<GithubIssueItem | null>(null);

  const showDrawer = (record: GithubIssueItem) => {
    setDetailData(record);
    setDrawerVisible(true);
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      hideInTable: true,
    },
    {
      title: '来源IP',
      dataIndex: 'srcIP',
      hideInSearch: true,
      copyable: true,
      width: 200,
      render: (_, record) => {
        return (
          <>
            {record.srcIp}:{record.srcPort}
          </>
        );
      },
    },
    {
      disable: true,
      title: '目的IP',
      dataIndex: 'dstIP',
      hideInSearch: true,
      copyable: true,
      width: 200,
      render: (_, record) => {
        return (
          <>
            {record.dstIp}:{record.dstPort}
          </>
        );
      },
    },
    {
      title: '端口',
      dataIndex: 'port',
      hideInTable: true,
    },
    {
      disable: true,
      title: '流量类型',
      dataIndex: 'label',
      valueType: 'select',
      width: 150,
      valueEnum: {
        正常流量: { text: '正常流量', status: 'Success' },
        可疑流量: { text: '可疑流量', status: 'Warning' },
        攻击流量: { text: '攻击流量', status: 'Error' },
      },
      search: false,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          return defaultRender(_);
        }
        return (
          <Select
            options={[
              { label: '正常流量', value: '正常流量' },
              { label: '可疑流量', value: '可疑流量' },
              { label: '攻击流量', value: '攻击流量' },
            ]}
            defaultValue={form.getFieldValue('labels')}
          ></Select>
        );
      },
      render: (_, record) => (
        <Space>
          <Tag color={selectLabelColor(record.label)} key={record.id}>
            {record.label}
          </Tag>
        </Space>
      ),
    },
    {
      title: '日期范围',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '协议',
      dataIndex: 'protocol',
      width: 160,
    },
    {
      title: '创建时间',
      key: 'timestamp',
      dataIndex: 'timestamp',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record, index, action) => [
        <Button
          type="primary"
          size="small"
          key="edit"
          onClick={async () => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </Button>,
        <Button
          type="primary"
          danger
          size="small"
          key="delete"
          onClick={async () => await APIManualBan(record.srcIp)}
        >
          禁用
        </Button>,
        <Button type="default" size="small" key="detail" onClick={() => showDrawer(record)}>
          详情
        </Button>,
      ],
    },
  ];

  useEffect(() => {
    actionRef.current?.reload();
  }, [activeKey]);


  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          await waitTime(2000);
          return request<{
            data: GithubIssueItem[];
          }>('/api/flowList', {
            params: {
              ...params,
              flowType: activeKey,
            },
          });
        }}
        editable={{
          type: 'multiple',
          /**
           *
           * @param key 不是后端传过来的id 后端传过来的id在record.id中
           * @param record 当前行的数据
           */
          onSave: async (key, record) => {
            await APIChangeFlow({ flowID: record.id, status: record.label });
            await waitTime(2000);
          },
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activeKey,
            items: [
              {
                key: '正常流量',
                label: <span>正常流量</span>,
              },
              {
                key: '攻击流量',
                label: <span>攻击流量</span>,
              },
              {
                key: '可疑流量',
                label: <span>可疑流量</span>,
              },
            ],
            onChange: (key) => {
              setActiveKey(key as ToolBarType);
              console.log(key)
            },
          },
        }}
        toolBarRender={() => []}
      />
      <Drawer
        title="详情"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {detailData && (
          <div>
            <p>
              来源IP: {detailData.srcIp}:{detailData.srcPort}
            </p>
            <p>
              目的IP: {detailData.dstIp}:{detailData.dstPort}
            </p>
            <p>流量类型: {detailData.label}</p>
            <p>时间: {detailData.timestamp}</p>
            <p>攻击类型: {detailData.attckType}</p>
            <p>协议: {detailData.protocol}</p>
            <p>载荷: {detailData.payload}</p>
          </div>
        )}
      </Drawer>
    </>
  );
};
