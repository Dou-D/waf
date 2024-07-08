import Graph from '@/components/SimpleStatic/Graph';
import SimpleStatistic from '@/components/SimpleStatic/SimpleStatus';
import { Statistic } from '@/components/SimpleStatic/typings';
import { Card, Col, Row } from 'antd';
import Event from '@/components/SimpleStatic/Event';
import React from 'react';

const data1: Statistic[] = [
  {
    title: '未发布',
    value: 5,
    status: 'default',
  },
  {
    title: '发布中',
    value: 3,
    status: 'processing',
  },
  {
    title: '发布异常',
    value: 2,
    status: 'error',
  },
  {
    title: '发布成功',
    value: '-',
    status: 'success',
  },
];
const data2: Statistic[] = [
  {
    title: '未发布',
    value: 5,
    status: 'default',
  },
  {
    title: '发布中',
    value: 3,
    status: 'processing',
  },
  {
    title: '发布异常',
    value: 2,
    status: 'error',
  },
];

const Dashboard: React.FC = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={16}>
          <Card>
            <SimpleStatistic data={data1} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <SimpleStatistic data={data2} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* 中间大图 */}
        <Col span={16}>
          <Card>
            <Graph />
          </Card>
        </Col>
        {/* 大图右侧折线图 */}
        <Col span={8}>
          <Card>
            <SimpleStatistic data={data2} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Event />
        </Col>
        <Col span={8}>
        <Event />
        </Col>
        <Col span={8}>
          {/* <Dynamic /> */}
          3
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
