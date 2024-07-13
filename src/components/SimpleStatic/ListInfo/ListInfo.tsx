import { ProList } from '@ant-design/pro-components';
import { Button, Modal, Progress } from 'antd';
import { useEffect, useState } from 'react';
import request from 'umi-request';
import { config } from '@/utils';
import { ListResponse } from './typings';

const data = {
  defaultData: [
    {
      id: '1',
      name: 'www.bilibi.com',
      process: 30,
    },
    {
      id: '2',
      name: '47.104.112.110:7888',
      process: 10,
    },
    {
      id: '3',
      name: 'www.zhihu.com',
      process: 20,
    },
    {
      id: '4',
      name: 'www.baidu.com',
      process: 50,
    },
    {
      id: '5',
      name: 'www.taobao.com',
      process: 40,
    },
    {
      id: '6',
      name: 'www.tmall.com',
      process: 60,
    },
    {
      id: '7',
      name: 'www.jd.com',
      process: 70,
    },
    {
      id: '8',
      name: 'www.douyin.com',
      process: 80,
    },
    {
      id: '9',
      name: 'www.weibo.com',
      process: 90,
    },
    {
      id: '10',
      name: 'www.toutiao.com',
      process: 100,
    },
  ],
  total: 234,
};
const defaultData = data.defaultData.slice(0, 5);
type DataItem = (typeof defaultData)[number];

export const ListInfo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageList, setPageList] = useState<DataItem[]>(data.defaultData);
  const [total, setTotal] = useState<number>(data.total);
  useEffect(() => {
    request('/api/siteList', {
      method: 'GET',
      ...config,
    }).then((res: ListResponse) => {
      setPageList(res.data.pageList.defaultData)
      setTotal(res.data.pageList.total);
    });
  });
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
    <ProList<DataItem>
      rowKey="id"
      headerTitle="外部来源页面"
      dataSource={pageList.slice(0,5)}
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
                  {data.defaultData.map((item) => (
                    <div key={item.id}>
                      {item.name}
                      <Progress percent={item.process} />
                    </div>
                  ))}
                </Modal>
              </>
            );
          },
        },
      }}
    />
  );
};
