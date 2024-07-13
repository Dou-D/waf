import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { LocaleResponse } from './typing';
import request from 'umi-request';
import { config } from '@/utils';


export const Locale: React.FC = () => {
  const [resData, setResData] = useState([3000, 202, 36, 20])
  const option = {
    title: {
      text: '拦截数据',
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataZoom: {},
        restore: {},
      },
    },
    tooltip: {},
    legend: {
      data: ['拦截'],
    },
    xAxis: {
      data: ['一个月前', '近七天', '昨天', '今天'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'line',
        data: resData,
        label: {},
      },
    ],
  };
  useEffect(() => {
    request('/api/intercept', {
      ...config,
      method: 'GET',
    }).then((res: LocaleResponse) => {
      setResData(res.data.sort((a, b) => b - a))
    })
  }, [])

  return <ReactECharts option={option} style={{ height: 400 }} opts={{ locale: 'FR' }} />;
};
