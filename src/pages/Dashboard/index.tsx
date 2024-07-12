import SimpleStatistic from '@/components/SimpleStatic/StatisticCard/SimpleStatus';
import { Statistic } from '@/components/SimpleStatic/typings';
import { Card, Col, Row, Radio } from 'antd';
import Event from '@/components/SimpleStatic/PieChart/Event';
import React, { useState } from 'react';
import FlowObserve from '@/components/SimpleStatic/FlowObserve/FlowObserve';
import { Locale } from '@/components/SimpleStatic';
import type { RadioChangeEvent } from 'antd';
import China from '@/components/SimpleStatic/China/China';
import LiaoNing from '@/components/SimpleStatic/LiaoNing/LiaoNing';
import request from 'umi-request';
import { config } from '@/utils';
import ListInfo from '@/components/SimpleStatic/StatisticCard/ListInfo';

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
const successRate: Statistic[] = [
  {
    title: '200',
    value: 5,
    status: 'success',
  },
  {
    title: '404',
    value: 3,
    status: 'warning',
  },
];
const errorRate: Statistic[] = [
  {
    title: '403',
    value: 5,
    status: 'processing',
  },
  {
    title: '501',
    value: 3,
    status: 'error',
  },
];
const Dashboard: React.FC = () => {
  const graphOption = ['中国', '辽宁'];
  const [graph, setGraph] = useState('中国');
  const onGraphChange = ({ target: { value } }: RadioChangeEvent) => {
    setGraph(value);
  };
  // request()

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
            <SimpleStatistic data={errorRate} />
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
            <SimpleStatistic data={successRate} />
          </Card>
          <Card>
            <Event />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <FlowObserve />
        </Col>
        <Col span={8}>
          <Locale />
          <ListInfo />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
