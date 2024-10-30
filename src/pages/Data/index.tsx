import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, notification, Select, Space, Tag, Upload, UploadProps } from 'antd';
import { useEffect, useRef, useState } from 'react';
import request from 'umi-request';
import { history } from 'umi';
import dayjs from 'dayjs';
import { pagination } from '@/common';
import { UploadOutlined } from '@ant-design/icons';
import { FlagResponse } from '@/common/FlagResponse';
import { useAppSelector } from '@/store';
import { useAppDispatch } from '@/store';
import { addColData } from '@/store/modules';

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
  else if (label === '处置流量') return 'disposal';
  return 'error';
};

export default () => {
  const disposalColData = useAppSelector((state) => state.disposal.columns);
  const [api, contextHolder] = notification.useNotification();
  const actionRef = useRef<ActionType>();
  const [activeKey, setActiveKey] = useState<PageData.ToolBarType>('正常');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [detailData, setDetailData] = useState<PageData.FlowListItems | null>(null);
  const dispatch = useAppDispatch();

  const showDrawer = (record: PageData.FlowListItems) => {
    setDetailData(record);
    setDrawerVisible(true);
  };
  const [uploadState, setUploadState] = useState<boolean>();

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
      dataIndex: 'srcIP',
      hideInSearch: true,
      copyable: true,
      width: 160,
      editable: false,
      hidden: activeKey === '处置',
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
      hidden: activeKey === '处置',
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
      hidden: activeKey === '处置',
    },
    {
      title: '响应时间',
      dataIndex: 'time',
      width: 100,
      hideInSearch: true,
      editable: false,
      hidden: activeKey === '处置',
    },
    {
      disable: true,
      title: '流量类型',
      dataIndex: 'label',
      valueType: 'select',
      hidden: activeKey === '处置',
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
      valueType: 'dateRange',
      hidden: activeKey === '处置',
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
      hidden: activeKey === '处置',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      key: 'timestamp',
      dataIndex: 'timestamp',
      hideInSearch: true,
      hidden: activeKey === '处置',
      editable: false,
      hideInTable: activeKey === '攻击' ? true : false,
      renderText: (text) => dayjs(text * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '状态',
      renderText: () => '已处置',
      width: 100,
      hidden: activeKey === '处置',
      hideInTable: activeKey !== '攻击' ? true : false,
    },
    {
      title: '处置类型',
      dataIndex: 'disposeType',
      hideInSearch: true,
      editable: false,
      width: 80,
      hideInTable: activeKey !== '攻击' ? true : false,
    },
    {
      title: '处置时间',
      dataIndex: 'disposeTime',
      valueType: 'dateTime',
      hideInSearch: true,
      editable: false,
      hideInTable: activeKey !== '攻击' ? true : false,
      renderText: (text) => dayjs(text * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      valueType: 'option',
      hidden: activeKey === '处置',
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
          onClick={async () => {
            dispatch(
              addColData({
                disposalIP: record.srcIp + ':' + record.srcPort,
                disposalProtocol: 'TCP',
                disposalTime: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
                disposalType: '封禁IP',
              }),
            );
            request('/api2/ban/ip', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
              method: "GET",
              params: {
                ip: record.srcIp,
              }
            }).then(() => {
              actionRef.current?.reload();
            })
          }}
        >
          禁用
        </Button>,
        <Button type="default" size="small" key="detail" onClick={() => showDrawer(record)}>
          详情
        </Button>,
      ],
    },
    // 处置流量
    {
      title: '处置ip',
      dataIndex: 'disposalIP',
      hideInSearch: true,
      editable: false,
      hideInTable: activeKey !== '处置' ? true : false,
    },
    {
      title: '处置类型',
      dataIndex: 'disposalType',
      editable: false,
      hideInTable: activeKey !== '处置' ? true : false,
      hideInSearch: activeKey !== '处置' ? true : false,
      filters: [
        {
          text: '封禁IP',
          value: '封禁IP',
        },
        {
          text: '封禁端口',
          value: '封禁端口',
        },
        {
          text: '扫描遏制',
          value: '扫描遏制',
        },
        {
          text: '封禁内部主机',
          value: '封禁内部主机',
        },
      ],
      onFilter: (value, record) => record.disposalType?.startsWith(value as string),
    },
    {
      title: '协议',
      dataIndex: 'disposalProtocol',
      hideInSearch: true,
      editable: false,
      hideInTable: activeKey !== '处置' ? true : false,
    },
    {
      title: '处置时间',
      dataIndex: 'disposalTime',
      hideInSearch: true,
      editable: false,
      hideInTable: activeKey !== '处置' ? true : false,
    },
  ];
  useEffect(() => {
    request<FlagResponse>('/api/flag', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      setUploadState(res.data);
    });
    actionRef.current?.reload();
  }, [activeKey]);
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      request('/api/trigger', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          flag: true,
        },
      })
        .then((res) => {
          location.reload();
          api.info({
            message: '上传成功',
          });
        })
        .catch(() => {
          api.error({
            message: '上传失败',
          });
        });
    }
  };
  return (
    <>
      <ProTable<PageData.FlowListItems>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (param) => {
          if (activeKey === '处置') {
            return {
              data: disposalColData,
              success: true,
              total: 100,
            };
          }
          const response = await request<PageData.FlowListResponse>('/api/flowList', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
              ...param,
              flowType: activeKey,
            },
          });
          // 上传文件后才能看到数据
          return {
            data: response.data?.flows,
            success: true,
            total: response.data?.total,
          };
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
              },
            });
            actionRef.current?.reload();
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
              {
                key: '处置',
                label: <span>处置流量</span>,
              },
            ],
            onChange: (key) => {
              setActiveKey(key as PageData.ToolBarType);
              console.log(key);
              actionRef.current?.reset?.();
            },
          },
        }}
        toolBarRender={() => [
          <input
            id="fileInput"
            type="file"
            accept=".pcap"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e)}
          />,
          <Button
            icon={<UploadOutlined />}
            onClick={async () => {
              document.getElementById('fileInput')?.click();
            }}
          >
            上传数据
          </Button>,
          <Button
            disabled={uploadState ? false : true}
            onClick={() => {
              request('/api/trigger', {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                params: {
                  flag: false,
                },
              }).then((res) => {
                location.reload();
              });
            }}
          >
            取消数据
          </Button>,
        ]}
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
            <p>
              处置时间: {dayjs.unix(Number(detailData.disposeTime)).format('YYYY-MM-DD HH:mm:ss')}
            </p>
            {activeKey === '攻击' && (
              <Button type="primary" onClick={() => history.push('/attack')}>
                查看攻击详情
              </Button>
            )}
          </div>
        )}
      </Drawer>
    </>
  );
};
