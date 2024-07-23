import React from 'react';
import ReactEcharts from 'echarts-for-react';

export const Assets: React.FC = () => {
  const data = [
    { "id": "1", "Mac": "00:11:22:33:44:55", "DNS": "www.google.com", "Address": "192.168.1.10", "SNMP": "v2c", "Time": "30ms" },
    { "id": "2", "Mac": "66:77:88:99:AA:BB", "DNS": "www.yahoo.com", "Address": "192.168.1.11", "SNMP": "v3", "Time": "25ms" },
    { "id": "3", "Mac": "CC:DD:EE:FF:00:11", "DNS": "www.bing.com", "Address": "192.168.1.12", "SNMP": "v1", "Time": "30ms" },
    { "id": "4", "Mac": "22:33:44:55:66:77", "DNS": "www.ask.com", "Address": "192.168.1.13", "SNMP": "v2c", "Time": "12ms" },
    { "id": "5", "Mac": "88:99:AA:BB:CC:DD", "DNS": "www.duckduckgo.com", "Address": "192.168.1.14", "SNMP": "v3", "Time": "40ms" },
    { "id": "6", "Mac": "EE:FF:00:11:22:33", "DNS": "www.aol.com", "Address": "192.168.1.15", "SNMP": "v1", "Time": "45ms" },
    { "id": "7", "Mac": "44:55:66:77:88:99", "DNS": "www.baidu.com", "Address": "192.168.1.16", "SNMP": "v2c", "Time": "50ms" },
    { "id": "8", "Mac": "AA:BB:CC:DD:EE:FF", "DNS": "www.yandex.com", "Address": "192.168.1.17", "SNMP": "v3", "Time": "36ms" }
  ];

  const getOption = () => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          const info = params.data;
          return `Mac: ${info.Mac}<br/>DNS: ${info.DNS}<br/>Address: ${info.Address}<br/>SNMP: ${info.SNMP}<br/>Time: ${info.Time}`;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.Address),
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} ms'
        }
      },
      series: [{
        name: 'Time',
        type: 'bar',
        data: data.map(item => ({ value: parseFloat(item.Time), ...item })),
        barWidth: '60%',
      }]
    };
  };

  return <ReactEcharts option={getOption()} style={{ height: '400px', width: '100%' }} />;
};
