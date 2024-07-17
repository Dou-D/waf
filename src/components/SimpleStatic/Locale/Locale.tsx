import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import request from 'umi-request';

export const Locale: React.FC = () => {
  const [result, setResult] = useState<number[]>();
  useEffect(() => {
    request('/api/intercept', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'GET',
    }).then((res: Locale.LocaleResponse) => {
      setResult(res.data)
    });
  }, []);
  const defaultOption = {
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
        data: result, 
        label: {},
      },
    ],
  };
  return <ReactECharts option={defaultOption} style={{ height: 400 }} opts={{ locale: 'FR' }} />
};
