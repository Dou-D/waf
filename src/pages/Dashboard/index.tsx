import SimpleStatistic from '@/components/SimpleStatic/StatisticCard/SimpleStatus';
import { Statistic } from '@/components/SimpleStatic/StatisticCard/typings';
import { Card, Col, Row, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import React, { useEffect, useState } from 'react';
import { FlowObserve } from '@/components/SimpleStatic/FlowObserve';
import { ListInfo } from '@/components/SimpleStatic/ListInfo';
import { Radar } from '@/components/SimpleStatic/RadarChart';
import { China } from '@/components/SimpleStatic/China';
import { LiaoNing } from '@/components/SimpleStatic/LiaoNing';
import { Locale } from '@/components/SimpleStatic/Locale';
import request from 'umi-request';
import { config } from '@/utils';
import type { Res, SiteResponse } from './typings';

const data1: Res[] = [
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

const testData1: Res[] = [
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
const testData2: Res[] = [
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
/* const res1: Statistic[] = [
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
 const res2: Statistic[] = [
//   {
//     title: '403',
//     value: 5,
//     status: 'processing',
//   },
//   {
//     title: '501',
//     value: 3,
//     status: 'error',
//   },
 ]; 
 */
const Dashboard: React.FC = () => {
  const graphOption = ['中国', '辽宁'];
  const [graph, setGraph] = useState('中国');
  const [site, setSite] = useState<Res[]>(testData1); // 请求200 404 403 501的数据
  const [res1, setRes1] = useState<Res[]>(testData1);
  const [res2, setRes2] = useState<Res[]>(testData2);
  const onGraphChange = ({ target: { value } }: RadioChangeEvent) => {
    setGraph(value);
  };
  useEffect(() => {
    request('/api/siteResponse', {
      ...config,
      method: 'GET',
    }).then((res: SiteResponse) => {
      res.data.res.forEach((item: Res) => {
        if (item.title === '200') {
          setRes1((preData) => [...preData, item]);
        } else if (item.title === '404') {
          setRes1((preData) => [...preData, item]);
        } else if (item.title === '403') {
          setRes2((preData) => [...preData, item]);
        } else if (item.title === '501') {
          setRes2((preData) => [...preData, item]);
        }
      });
    });
  }, []);

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
            <SimpleStatistic data={testData2} />
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
            <SimpleStatistic data={testData1} />
          </Card>
          <Card>
            <Radar />
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
