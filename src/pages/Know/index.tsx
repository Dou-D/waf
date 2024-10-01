import { pagination } from '@/common';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import { memo, useState, useEffect } from 'react';
import request from 'umi-request';
import { KnowEcharts } from '@/components/Know';



interface PocDetail extends Know.ListItems { }

interface PocDetailResponse {
  data: PocDetail
  message: string
  status: number
}
const Know: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showData, setShowData] = useState<Know.ListItems | null>(null);

  const showModal = async (record: Know.ListItems) => {
    request<PocDetailResponse>('/api/detailedPoc', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        id: record.ID
      }
    }).then((res) => {
      setShowData(res.data)
    })
    setIsModalOpen(true)
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setShowData(null);  // 关闭 Modal 时清除数据
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setShowData(null);  // 关闭 Modal 时清除数据
  };

  const columns: ProColumns<Know.ListItems>[] = [
    {
      dataIndex: "ID",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: 'cve_id',
      dataIndex: 'cve_id',
    },
    {
      title: '协议',
      dataIndex: 'protocol',
      width: 48,
    },
    {
      title: '载荷',
      dataIndex: 'payload',
    },
    {
      title: '更新时间',
      dataIndex: 'UpdatedAt',
      valueType: 'dateTime'
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => {
        return (
          <>
            <Button size="small" onClick={() => showModal(record)}>详情</Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <ProTable<Know.ListItems>
        columns={columns}
        request={async (params,) => {
          const response = await request<Know.KnowResponse>('/api/pocList', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params
          });
          return {
            data: response.data.list,
            success: true,
            total: response.data.total,
          }
        }}
        rowKey="id"
        pagination={pagination}
        search={false}
        dateFormatter="string"
        headerTitle="安全漏洞"
      />
      <Modal
      title="知识库详情图"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        {showData && <KnowEcharts data={showData} />}
      </Modal>
    </>
  );
};

export default memo(Know);
