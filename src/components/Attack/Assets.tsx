import React, { useEffect } from 'react';
import * as echarts from 'echarts';

interface ListItem {
  id: string;
  Mac: string;
  DNS: string;
  Address: string;
  SNMP: string;
  Time: string;
}

const dataItems: ListItem[] = [
  { id: "1", Mac: "00:00:00:00:00:00", DNS: "www.baidu.com", Address: "192.168.1.1", SNMP: "SNMP", Time: "12ms" },
  { id: "2", Mac: "00:00:00:00:00:00", DNS: "www.baidu.com", Address: "192.168.1.1", SNMP: "SNMP", Time: "24ms" },
  { id: "3", Mac: "00:00:00:00:00:00", DNS: "www.baidu.com", Address: "192.168.1.1", SNMP: "SNMP", Time: "24ms" },
  { id: "4", Mac: "00:00:00:00:00:00", DNS: "www.baidu.com", Address: "192.168.1.1", SNMP: "SNMP", Time: "24ms" },
  { id: "5", Mac: "00:00:00:00:00:00", DNS: "www.baidu.com", Address: "192.168.1.1", SNMP: "SNMP", Time: "24ms" },
  { id: "6", Mac: "00:00:00:00:00:00", DNS: "www.baidu.com", Address: "192.168.1.1", SNMP: "SNMP", Time: "24ms" },
  { id: "7", Mac: "00:00:00:00:00:00", DNS: "www.baidu.com", Address: "192.168.1.1", SNMP: "SNMP", Time: "24ms" },
  { id: "8", Mac: "00:00:00:00:00:00", DNS: "www.baidu.com", Address: "192.168.1.1", SNMP: "SNMP", Time: "24ms" },
];

export const Assets: React.FC = () => {
  useEffect(() => {
    // 初始化 ECharts 实例
    const chartDom = document.getElementById('main')!;
    const myChart = echarts.init(chartDom);

    // 处理数据
    const categories = dataItems.map(item => item.Mac);
    const values = dataItems.map(item => parseInt(item.Time));

    // 配置项
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: categories,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Time',
          type: 'bar',
          barWidth: '60%',
          data: values
        }
      ]
    };

    // 使用配置项生成图表
    myChart.setOption(option);
  }, []);

  return (
    <div id="main" style={{ width: '100%', height: '400px' }}></div>
  );
};

