import { FlagResponse } from '@/common/FlagResponse';
import { ProList } from '@ant-design/pro-components';
import { Button, Modal, Progress } from 'antd';
import { useEffect, useState } from 'react';
import request from 'umi-request';

export const ListInfo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageList, setPageList] = useState<ListInfo.Items[]>();
  const [total, setTotal] = useState<number>(100);
  const [uploadState, setUploadState] = useState<boolean>()

  useEffect(() => {
    request<FlagResponse>('/api/flag', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      setUploadState(res.data);
    });
    request('/api/siteList', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res: ListInfo.ListResponse) => {
      setPageList(res.data)
      const computed = res?.data?.reduce((pre, cur) => {
        return pre + cur.process;
      }, 0)
      setTotal(computed)
    });
  }, [uploadState]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <ProList<ListInfo.Items>
      rowKey="id"
      headerTitle="外部来源页面"
      dataSource={pageList?.slice(0, 5)}
      showActions="hover"
      toolBarRender={() => {
        return [
          <Button key="3" type="primary" onClick={showModal}>
            详情
          </Button>,
        ];
      }}
      onDataSourceChange={setPageList}
      metas={{
        title: {
          dataIndex: 'name',
        },
        content: {
          render: (_, record) => (
            <Progress percent={Math.floor((record.process / total) * 100)} />
          ),
        },
        subTitle: {
          render: () => {
            return (
              <>
                <Modal title="受访域名" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  {
                    pageList?.map(item => {
                      return (
                        <div key={item.id}>
                          {item.name}
                          <Progress percent={item.process} />
                        </div>
                      )
                    })
                  }
                </Modal>
              </>
            );
          },
        },
      }}
    />
  );
};
