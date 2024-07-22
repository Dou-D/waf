import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ComposeOption } from 'echarts/core';
import { GraphSeriesOption, TitleComponentOption, TooltipComponentOption } from 'echarts';

type ECOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GraphSeriesOption
>;

const getOption = (): ECOption => {
  return {
    title: {
      text: 'WAF 流量监控抓包项目',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        return params.data.description || params.data.name;
      },
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 2000,
          edgeLength: 200,
        },
        roam: true,
        label: {
          show: true,
          position: 'inside',
          formatter: '{b}',
        },
        edgeLabel: {
          show: true,
          formatter: '{c}',
          position: 'middle',
        },
        data: [
          { name: 'Golang (gopacket 抓包)', x: 100, y: 100, symbolSize: 100, itemStyle: { color: '#1f77b4' }, description: '通过 gopacket 抓取网络包' },
          { name: '消息队列', x: 300, y: 100, symbolSize: 80, itemStyle: { color: '#ff7f0e' }, description: '传递抓取的流量数据' },
          { name: 'Python (流量分析)', x: 500, y: 100, symbolSize: 100, itemStyle: { color: '#2ca02c' }, description: '分析流量并判断攻击类型和流量类型' },
          { name: 'Elasticsearch', x: 700, y: 100, symbolSize: 100, itemStyle: { color: '#d62728' }, description: '存储分析后的流量数据' },
          { name: 'Golang (数据获取)', x: 900, y: 100, symbolSize: 100, itemStyle: { color: '#9467bd' }, description: '从 Elasticsearch 获取数据' },
          { name: '前端', x: 1100, y: 100, symbolSize: 80, itemStyle: { color: '#8c564b' }, description: '展示流量监控和分析结果' },
        ],
        links: [
          { source: 'Golang (gopacket 抓包)', target: '消息队列', label: { show: true }, lineStyle: { color: 'source' }, value: '抓取流量推送' },
          { source: '消息队列', target: 'Python (流量分析)', label: { show: true }, lineStyle: { color: 'target' }, value: '传递流量数据' },
          { source: 'Python (流量分析)', target: 'Elasticsearch', label: { show: true }, lineStyle: { color: 'source' }, value: '存储分析结果' },
          { source: 'Elasticsearch', target: 'Golang (数据获取)', label: { show: true }, lineStyle: { color: 'target' }, value: '获取数据' },
          { source: 'Golang (数据获取)', target: '前端', label: { show: true }, lineStyle: { color: 'source' }, value: '展示数据' },
        ],
      },
    ],
  };
};

const WafVisualization: React.FC = () => {
  return <ReactECharts option={getOption()} style={{ height: '600px', width: '100%' }} />;
};

export default WafVisualization;
