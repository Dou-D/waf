import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Select, Space, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import request from 'umi-request';
import { history } from 'umi'
import dayjs from 'dayjs';
import { pagination } from '@/common';

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

const selectLabelColor = (label: string): PageData.LabelColor => {
  if (label === '正常流量') return 'success';
  else if (label === '可疑流量') return 'warning';
  return 'error';
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [activeKey, setActiveKey] = useState<PageData.ToolBarType>('正常');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [detailData, setDetailData] = useState<PageData.FlowListItems | null>(null);
  const showDrawer = (record: PageData.FlowListItems) => {
    setDetailData(record);
    setDrawerVisible(true);
  };
  const columns: ProColumns<PageData.FlowListItems>[] = [
    {
      dataIndex: 'id',
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
      dataIndex: "srcIP",
      hideInSearch: true,
      copyable: true,
      width: 160,
      editable: false,
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
      width: 160,
      editable: false,
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
      title: '响应时间',
      dataIndex: 'time',
      width: 100,
      hideInSearch: true,
      editable: false,
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
              { label: '正常流量', value: '正常' },
              { label: '可疑流量', value: '可疑' },
              { label: '攻击流量', value: '攻击' },
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
      valueType: "dateRange",
      hideInTable: true,
      search: {
        transform: (value) => {
          const startTime = new Date(`${value[0]}`).getTime() / 1000;
          const endTime = new Date(`${value[1]}`).getTime() / 1000;
          return {
            startTime: startTime ? startTime : void 0,
            endTime: endTime ? endTime : void 0,
          };
        },
      },
    },
    {
      title: '协议',
      dataIndex: 'protocol',
      width: 100,
      editable: false,
    },
    {
      title: '创建时间',
      key: 'timestamp',
      dataIndex: 'timestamp',
      hideInSearch: true,
      editable: false,
      hideInTable: activeKey === "攻击" ? true : false,
      renderText: (text) => dayjs(text * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: "状态",
      renderText: () => '已处置',
      width: 70,
      hideInTable: activeKey !== "攻击" ? true : false,
    },
    {
      title: '处置类型',
      dataIndex: 'disposeType',
      hideInSearch: true,
      editable: false,
      width: 80,
      hideInTable: activeKey !== "攻击" ? true : false,
    },
    {
      title: '处置时间',
      dataIndex: 'disposeTime',
      valueType: 'dateTime',
      hideInSearch: true,
      editable: false,
      hideInTable: activeKey !== "攻击" ? true : false,
      renderText: (text) => dayjs(text * 1000).format('YYYY-MM-DD HH:mm:ss')
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
          onClick={async () => request('/api/manualBan', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            method: 'POST',
            data: {
              ip: record.srcIp,
              type: "封禁IP"
            }
          },).then(() => {
            actionRef.current?.reload();
          })}
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
      <ProTable<PageData.FlowListItems>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (param,) => {
          const response = await request<PageData.FlowListResponse>('/api/flowList', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
              ...param,
              flowType: activeKey,
            },
          });
          return {
            data: response.data.flows,
            success: true,
            total: response.data.total,
          }
        }}
        editable={{
          type: 'multiple',
          /**
           *
           * @param key 不是后端传过来的id 后端传过来的id在record.id中
           * @param record 当前行的数据
           */
          onSave: async (key, record) => {
            // await APIChangeFlow({ flowID: record.id, status: record.label });
            await request('/api/changeFlow', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              method: 'POST',
              data: {
                flowID: record.id,
                status: record.label,
              }
            })
            actionRef.current?.reload();
            // await waitTime(2000);
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
        pagination={pagination}
        dateFormatter="string"
        headerTitle="高级表格"
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activeKey,
            items: [
              {
                key: '正常',
                label: <span>正常流量</span>,
              },
              {
                key: '攻击',
                label: <span>攻击流量</span>,
              },
              {
                key: '可疑',
                label: <span>可疑流量</span>,
              },
            ],
            onChange: (key) => {
              setActiveKey(key as PageData.ToolBarType);
              console.log(key);
              actionRef.current?.reset?.();
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
            <p>时间: {dayjs.unix(Number(detailData.timestamp)).format('YYYY-MM-DD HH:mm:ss')}</p>
            <p>攻击类型: {detailData.attackType}</p>
            <p>协议: {detailData.protocol}</p>
            <p>载荷: {detailData.payload}</p>
            <p>http: {detailData.httpPayload}</p>
            <p>响应时间：{detailData.time}</p>
            <p>处置类型: {detailData.disposeType}</p>
            <p>处置时间: {dayjs.unix(Number(detailData.disposeTime)).format('YYYY-MM-DD HH:mm:ss')}</p>
            { activeKey === "攻击" && <Button type="primary" onClick={() => history.push('/attack')}>查看攻击详情</Button>}
          </div>
        )}
      </Drawer>
    </>
  );
};
