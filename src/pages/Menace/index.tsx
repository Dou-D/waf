import { pagination } from '@/common';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { history } from 'umi';
import request from 'umi-request';

export default () => {
  const [open, setOpen] = useState(false);
  const [detailData, setDetailData] = useState<Menace.MenaceItems | null>(null);

  const showDrawer = (record: Menace.MenaceItems) => {
    setDetailData(record);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const columns: ProColumns<Menace.MenaceItems>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '来源',
      dataIndex: 'src',
    },
    {
      title: 'md5',
      dataIndex: 'md5',
    },
    {
      title: '时间',
      dataIndex: 'time',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record, index, action) => [
        <Button
        type="primary"
          onClick={() => {
            window.open(record.url);
          }}
        >
          跳转
        </Button>,
        <Button onClick={() => showDrawer(record)}>详情</Button>,
      ],
    },
  ];
  return (
    <>
      <ProTable<Menace.MenaceItems>
        columns={columns}
        request={async (param) => {
          const response = await request<Menace.MenaceResponse>('/api/threat_broadcast', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
              page: param.current,
              size: param.pageSize,
            },
          });
          // 上传文件后才能看到数据
          return {
            data: response.data?.list,
            success: true,
            total: response.data?.total,
          };
        }}
        rowKey="key"
        search={false}
        pagination={pagination}
      />
      <Drawer title="Basic Drawer" onClose={onClose} open={open} placement="bottom">
        <p>id:{detailData?.id}</p>
        <p>{detailData?.title}</p>
        <p>{detailData?.src}</p>
        <p>{detailData?.md5}</p>
        <p>{detailData?.info}</p>
        <p>{detailData?.url}</p>
        <p>{detailData?.time}</p>
      </Drawer>
    </>
  );
};
