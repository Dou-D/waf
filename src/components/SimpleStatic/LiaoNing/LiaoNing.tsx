import { Card, Col, Row, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import * as Echarts from 'echarts';
import liaoningJson from '@/assets/liaoning.json';
import request from 'umi-request';
import { FlagResponse } from '@/common/FlagResponse';

export const LiaoNing: React.FC = () => {
  const [value, setValue] = useState(95);
  const [total, setTotal] = useState(1000);
  const [newVisit, setNewVisit] = useState(50);
  const [pv, setPv] = useState(200);
  const [cities, setCities] = useState([
    { name: '沈阳', value: 500 },
    { name: '大连', value: 300 },
    { name: '鞍山', value: 100 },
    { name: '抚顺', value: 50 },
    { name: '本溪', value: 20 },
    { name: '丹东', value: 10 },
    { name: '锦州', value: 5 },
    { name: '营口', value: 2 },
    { name: '阜新', value: 1 },
    { name: '辽阳', value: 1 },
    { name: '盘锦', value: 1 },
    { name: '铁岭', value: 1 },
    { name: '朝阳', value: 1 },
    { name: '葫芦岛', value: 1 },
  ]);
  const [uploadState, setUploadState] = useState<boolean>();

  useEffect(() => {
    request<FlagResponse>('/api/flag', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      setUploadState(res.data);
    });
    uploadState && drawMap();
  }, [cities]);

  const drawMap = () => {
    const myChart = Echarts.init(document.getElementById('liaoning-map') as HTMLElement);
    let name = 'Liaoning';
    Echarts.registerMap(name, liaoningJson as any);
    let option = {
      backgroundColor: '#fff',
      title: {
        top: 10,
        text: '',
        subtext: '30天访问来源地区',
        x: 'left',
        textStyle: {
          color: '#000',
        },
      },
      tooltip: {
        show: true,
        trigger: 'item',
        formatter(params) {
          return `地区：${params.name}</br>数值：${params.value}`;
        },
      },
      geo: {
        type: 'map',
        map: name,
        roam: true,
        scaleLimit: {
          min: 1,
          max: 2,
        },
        zoom: 1.1,
        label: {
          normal: {
            show: false,
            fontSize: '14',
            color: 'rgba(0,0,0,0.7)',
          },
          emphasis: {
            show: true,
            textStyle: {
              color: '#000000',
            },
          },
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(0, 0, 0, 0.2)',
            areaColor: '#aaaaaa',
          },
          emphasis: {
            areaColor: 'rgba(63, 134, 0,0.2)',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            borderWidth: 0,
          },
        },
      },
      visualMap: {
        show: true,
        left: 26,
        bottom: 40,
        showLabel: true,
        pieces: [
          {
            gte: 500,
            label: '>500',
            color: '#9feaa5',
          },
          {
            gte: 100,
            lt: 500,
            label: '100 - 499',
            color: '#74e2ca',
          },
          {
            gte: 10,
            lt: 100,
            label: '10 - 99',
            color: '#85daef',
          },
          {
            lt: 10,
            label: '<10',
            color: '#bfe5da',
          },
        ],
      },
      series: [
        {
          name: '人数',
          type: 'map',
          geoIndex: 0,
          data: cities,
        },
      ],
    };
    uploadState && myChart.setOption(option, true);
  };

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col span={6}>
          {uploadState && (
            <Card bordered={false}>
              <Statistic
                title="匹配率"
                value={value}
                precision={2}
                valueStyle={value > 70 ? { color: '#3f8600' } : { color: '#cf1322' }}
                suffix="%"
              />
            </Card>
          )}
        </Col>
        <Col span={6}>
          {uploadState && (
            <Card bordered={false}>
              <Statistic title="累计用户数" value={total} valueStyle={{ color: '#3f8600' }} />
            </Card>
          )}
        </Col>
        <Col span={6}>
          {uploadState && (
            <Card bordered={false}>
              <Statistic title="新用户数" value={newVisit} valueStyle={{ color: '#3f8600' }} />
            </Card>
          )}
        </Col>
        <Col span={6}>
          {uploadState && (
            <Card bordered={false}>
              <Statistic title="昨日浏览量" value={pv} valueStyle={{ color: '#3f8600' }} />
            </Card>
          )}
        </Col>
        <Col span={12}>
          {uploadState && (
            <Card bordered={false}>
              <div id="liaoning-map" style={{ height: '350px', width: '100%' }}></div>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};
