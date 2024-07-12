import { ProList } from '@ant-design/pro-components';
import { Button, Modal, Progress } from 'antd';
import { useState } from 'react';

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
  const [dataSource, setDataSource] = useState<DataItem[]>(defaultData);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      headerTitle="基础列表"
      dataSource={dataSource}
      showActions="hover"
      toolBarRender={() => {
        return [
          <Button key="3" type="primary" onClick={showModal}>
            详情
          </Button>,
        ];
      }}
      onDataSourceChange={setDataSource}
      metas={{
        title: {
          dataIndex: 'name',
        },
        content: {
          render: (_, record) => (
            <Progress percent={Math.floor((record.process / data.total) * 100)} />
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
