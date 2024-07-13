import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import request from 'umi-request';
import { config } from '@/utils';
import { RadarData, RadarResponse, Series } from './typing';
import { waitTime } from '@/pages/Data';

export const Radar: React.FC = () => {
  const [computed, setComputed] = useState<number[]>();
  const [browser, setBrowser] = useState<number[]>();
  const option = {
    title: [
      {
        text: '客户端',
        left: '50%',
        top: '10%',
        textAlign: 'center',
      },
      {
        left: '75%',
        top: '10%',
        textAlign: 'center',
      },
    ],
    tooltip: {},
    legend: {
      data: ['电脑类型', '浏览器'],
      left: 'center',
      top: 'bottom',
    },
    radar: [
      {
        indicator: [
          { name: 'Windows', max: 2000 },
          { name: 'macOS', max: 2000 },
          { name: 'Linux', max: 2000 },
          { name: 'Android', max: 2000 },
          { name: 'iOS', max: 2000 },
        ],
        center: ['25%', '60%'],
        radius: 80,
      },
      {
        indicator: [
          { name: 'Chrome', max: 2000 },
          { name: 'Firefox', max: 2000 },
          { name: 'Safari', max: 2000 },
          { name: 'Edge', max: 2000 },
          { name: 'Opera', max: 2000 },
          { name: 'Internet Explorer', max: 2000 },
        ],
        center: ['75%', '60%'],
        radius: 80,
      },
    ],
    series: [
      {
        name: '电脑类型',
        type: 'radar',
        radarIndex: 0,
        data: computed,
      },
      {
        name: '浏览器',
        type: 'radar',
        radarIndex: 1,
        data: browser,
      },
    ],
  };
  let timer;
  useEffect(() => {
    request('/api/radar', {
      ...config,
      method: 'GET',
    }).then((res: RadarResponse) => {
      setComputed(res.data.series[0].value);
      setBrowser(res.data.series[1].value);
    });
  }, []);

  const loadingOption = {
    text: '加载中...',
    color: '#4413c2',
    textColor: '#270240',
    maskColor: 'rgba(194, 88, 86, 0.3)',
    zlevel: 0,
  };

  function onChartReady(echarts) {
    waitTime(2000);
  }

  return (
    <ReactECharts
      option={option}
      style={{ height: 400 }}
      onChartReady={onChartReady}
      loadingOption={loadingOption}
      showLoading={true}
    />
  );
};
