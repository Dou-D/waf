import React from 'react';
import ReactECharts from 'echarts-for-react';

// import "echarts/i18n/langFR";

export const Locale: React.FC = () => {
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
        data: [3000, 202, 36, 20],
        label: {
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} opts={{ locale: 'FR' }} />;
};
