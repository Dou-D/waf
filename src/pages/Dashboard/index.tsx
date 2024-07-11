// import Graph from '@/components/SimpleStatic/Graph';
import SimpleStatistic from '@/components/SimpleStatic/SimpleStatus';
import { Statistic } from '@/components/SimpleStatic/typings';
import { Card, Col, Row, Radio } from 'antd';
import Event from '@/components/SimpleStatic/Event';
import React, { useState } from 'react';
import FlowObserve from '@/components/SimpleStatic/FlowObserve';
import { Locale } from '@/components/SimpleStatic';
import type { RadioChangeEvent } from 'antd';
import China from '@/components/SimpleStatic/China';
import LiaoNing from '@/components/SimpleStatic/LiaoNing';

const data1: Statistic[] = [
  {
    title: '访问次数',
    value: 5,
    status: 'default',
  },
  {
    title: '访客',
    value: 3,
    status: 'processing',
  },
  {
    title: '独立IP',
    value: 2,
    status: 'error',
  },
  {
    title: '攻击次数',
    value: 23,
    status: 'success',
  },
];
const data2: Statistic[] = [
  {
    title: '4xx错误率',
    value: 5,
    status: 'default',
  },
  {
    title: '5xx错误率',
    value: 3,
    status: 'processing',
  },
];

const Dashboard: React.FC = () => {
  const graphOption = ['中国', '辽宁'];
  const [graph, setGraph] = useState('中国');
  const onGraphChange = ({ target: { value } }: RadioChangeEvent) => {
    setGraph(value);
  };

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
            <Radio.Group options={graphOption} onChange={onGraphChange} value={graph} />
            {graph === '中国' ? <China /> : <LiaoNing />}
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <SimpleStatistic data={data2} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <FlowObserve />
        </Col>
        <Col span={8}>
          <Locale />
        </Col>
        <Col span={8}>
          <Event />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
