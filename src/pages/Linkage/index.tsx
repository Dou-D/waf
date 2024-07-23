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
          position: "middle",
        },
        data: [
          {
            name: 'Golang (gopacket 抓包)',
            x: 100,
            y: 100,
            symbolSize: 100,
            itemStyle: { color: '#1f77b4' },
            description: '通过 gopacket 抓取网络包：使用 Go 语言中的 gopacket 库来捕获网络流量数据包，作为流量监控的第一步。'
          },
          {
            name: '消息队列',
            x: 300,
            y: 100,
            symbolSize: 80,
            itemStyle: { color: '#ff7f0e' },
            description: '传递抓取的流量数据：捕获到的流量数据通过消息队列传递到下一个处理模块，确保数据流的高效和可靠传输。'
          },
          {
            name: 'Python (流量分析)',
            x: 500,
            y: 100,
            symbolSize: 100,
            itemStyle: { color: '#2ca02c' },
            description: '分析流量并判断攻击类型和流量类型：使用 Python 脚本对流量数据进行分析，识别潜在的攻击行为并分类流量类型。'
          },
          {
            name: 'Elasticsearch',
            x: 700,
            y: 100,
            symbolSize: 100,
            itemStyle: { color: '#d62728' },
            description: '存储分析后的流量数据：将分析结果存储在 Elasticsearch 中，方便后续的数据检索和可视化。'
          },
          {
            name: 'Golang (数据获取)',
            x: 900,
            y: 100,
            symbolSize: 100,
            itemStyle: { color: '#9467bd' },
            description: '从 Elasticsearch 获取数据：使用 Go 语言从 Elasticsearch 中检索存储的流量分析数据，准备进行前端展示。'
          },
          {
            name: '前端',
            x: 1100,
            y: 100,
            symbolSize: 80,
            itemStyle: { color: '#8c564b' },
            description: '展示流量监控和分析结果：通过前端应用展示流量监控数据和分析结果，提供用户友好的可视化界面。'
          },
          {
            name: '处置',
            x: 500,
            y: 400,
            symbolSize: 100,
            itemStyle: { color: '#e377c2' },
            description: '处理流量和IP：对检测到的恶意流量和可疑IP进行处置，确保网络安全。'
          }
        ],
        links: [
          { source: 'Golang (gopacket 抓包)', target: '消息队列', label: { show: true }, lineStyle: { color: 'source' }, value: '抓取流量推送' },
          { source: '消息队列', target: 'Python (流量分析)', label: { show: true }, lineStyle: { color: 'target' }, value: '传递流量数据' },
          { source: 'Python (流量分析)', target: 'Elasticsearch', label: { show: true }, lineStyle: { color: 'source' }, value: '存储分析结果' },
          { source: 'Elasticsearch', target: 'Golang (数据获取)', label: { show: true }, lineStyle: { color: 'target' }, value: '获取数据' },
          { source: 'Golang (数据获取)', target: '前端', label: { show: true }, lineStyle: { color: 'source' }, value: '展示数据' },
          { source: "Python (流量分析)", target: "处置", label: { show: true }, lineStyle: { color: 'source' }, value: '处理流量和IP' },
        ],
      },
    ],
  };
};

const WafVisualization: React.FC = () => {
  return <ReactECharts option={getOption()} style={{ height: '600px', width: '100%' }} />;
};

export default WafVisualization;
