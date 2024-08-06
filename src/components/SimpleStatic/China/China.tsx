import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import * as Echarts from 'echarts';
import chinaJson from '@/assets/china.json';
import { LiaoNing } from '@/components/SimpleStatic/LiaoNing';
import { useAppSelector } from '@/store';
import request from 'umi-request';
import { FlagResponse } from '@/common/FlagResponse';

export const China: React.FC = () => {
  const [total, setTotal] = useState(1000);
  const [match, setMatch] = useState(500);
  const [unmatch, setUnmatch] = useState(200);
  const [province, setProvince] = useState([
    { name: '北京', value: 550 },
    { name: '天津', value: 420 },
    { name: '上海', value: 500 },
    { name: '重庆', value: 380 },
    { name: '河北省', value: 350 },
    { name: '山西省', value: 300 },
    { name: '辽宁省', value: 320 },
    { name: '吉林省', value: 280 },
    { name: '黑龙江省', value: 260 },
    { name: '江苏省', value: 480 },
    { name: '浙江省', value: 470 },
    { name: '安徽省', value: 430 },
    { name: '福建省', value: 410 },
    { name: '江西省', value: 400 },
    { name: '山东省', value: 450 },
    { name: '河南省', value: 440 },
    { name: '湖北省', value: 420 },
    { name: '湖南省', value: 410 },
    { name: '广东省', value: 500 },
    { name: '海南省', value: 390 },
    { name: '四川省', value: 370 },
    { name: '贵州省', value: 340 },
    { name: '云南省', value: 330 },
    { name: '陕西省', value: 310 },
    { name: '甘肃省', value: 20 },
    { name: '青海省', value: 15 },
    { name: '台湾', value: 300 },
    { name: '内蒙古', value: 20 },
    { name: '广西', value: 30 },
    { name: '西藏', value: 5 },
    { name: '宁夏', value: 210 },
    { name: '新疆', value: 0 },
    { name: '香港', value: 480 },
    { name: '澳门', value: 470 },
  ]);
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
    getData();
  }, []);

  const getData = async () => {
    drawMap();
  };

  const computedLiaoNingTotal = () => {
    const LiaoNingInstalce = new LiaoNing();
    const LiaoNingTotal = LiaoNingInstalce.computedTotal();
    setProvince((prevProvince) => {
      const updatedProvince = [...prevProvince];
      updatedProvince[6].value = LiaoNingTotal;
      return updatedProvince;
    });
  };

  const drawMap = () => {
    const myChart = Echarts.init(document.getElementById('china-map') as HTMLElement);
    let name = 'China';
    Echarts.registerMap(name, chinaJson as any);
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
        formatter(params: any) {
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
          data: province,
        },
      ],
    };
    uploadState && myChart.setOption(option, true);
  };

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="今日请求数" value={total} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="匹配数" value={match} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="未匹配数" value={unmatch} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col span={24}>
          <Card bordered={false}>
            <div id="china-map" style={{ height: '350px', width: '100%' }}></div>
          </Card>
        </Col>
      </Row>
    </>
  );
};
