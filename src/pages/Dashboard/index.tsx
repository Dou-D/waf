import SimpleStatistic from '@/components/SimpleStatic/StatisticCard/SimpleStatus';
import { Card, Col, Row, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { FlowObserve } from '@/components/SimpleStatic/FlowObserve';
import { ListInfo } from '@/components/SimpleStatic/ListInfo';
import { Radar } from '@/components/SimpleStatic/RadarChart';
import { China } from '@/components/SimpleStatic/China';
import { LiaoNing } from '@/components/SimpleStatic/LiaoNing';
import { Locale } from '@/components/SimpleStatic/Locale';
import request from 'umi-request';

const Dashboard: React.FC = () => {
  const graphOption = ['中国', '辽宁'];
  const [graph, setGraph] = useState('中国');
  const [result, setResult] = useState<Dashboard.Res[]>();
  const [siteInfo, setSiteInfo] = useState<Dashboard.SiteInfoItem[]>()
  const onGraphChange = ({ target: { value } }: RadioChangeEvent) => {
    setGraph(value);
  };
  useEffect(() => {
    Promise.all([request('/api/siteResponse', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'GET',
    }).then((res: Dashboard.SiteResponse) => {
      setResult(res.data.res)
    }),
    request('/api/siteInfo', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'GET',
    }).then((res: Dashboard.SiteInfoResponse) => {
      setSiteInfo(res.data.accessData)
    })
    ])

  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col span={16}>
          <Card>
            <SimpleStatistic data={siteInfo ? siteInfo : []} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <SimpleStatistic data={result ? [result[0], result[1]] : []} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* 中间大图 */}
        <Col span={16}>
          <Card>
            <Radio.Group options={graphOption} onChange={onGraphChange} value={graph} />
            { graph === '中国' ? <China /> : <LiaoNing />}
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <SimpleStatistic data={result ? [result[2], result[3]] : []} />
          </Card>
          <Card>
            <Radar />
          </Card>
        </Col>
      </Row >

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

export default memo(Dashboard);
