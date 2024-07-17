import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import request from 'umi-request';
import { config } from '@/utils';
import { FlowListItems, FlowListResponse } from './typing';

export const AttackPath: React.FC = () => {
  // 本地数据集
  // const trafficData = [
  //   {
  //     id: "1",
  //     srcMac: "00:1A:2B:3C:4D:5E",
  //     srcIp: "192.168.1.1",
  //     dstMac: "00:1A:2B:3C:4D:5F",
  //     dstIp: "192.168.1.2",
  //     srcPort: "12345",
  //     dstPort: "80",
  //     protocol: "TCP",
  //     payload: "example payload",
  //     timestamp: "2024-07-16 12:34:56",
  //     label: "normal",
  //     attackType: "none",
  //     responseTime: "50ms"
  //   },
  //   {
  //     id: "2",
  //     srcMac: "00:1A:2B:3C:4D:5E",
  //     srcIp: "192.168.1.1",
  //     dstMac: "00:1A:2B:3C:4D:60",
  //     dstIp: "192.168.1.3",
  //     srcPort: "12346",
  //     dstPort: "443",
  //     protocol: "TCP",
  //     payload: "example payload",
  //     timestamp: "2024-07-16 12:35:56",
  //     label: "normal",
  //     attackType: "none",
  //     responseTime: "45ms"
  //   },
  //   {
  //     id: "3",
  //     srcMac: "00:1A:2B:3C:4D:5F",
  //     srcIp: "192.168.1.2",
  //     dstMac: "00:1A:2B:3C:4D:5E",
  //     dstIp: "192.168.1.1",
  //     srcPort: "80",
  //     dstPort: "12345",
  //     protocol: "TCP",
  //     payload: "example payload",
  //     timestamp: "2024-07-16 12:36:56",
  //     label: "normal",
  //     attackType: "none",
  //     responseTime: "40ms"
  //   },
  //   {
  //     id: "4",
  //     srcMac: "00:1A:2B:3C:4D:5G",
  //     srcIp: "192.168.1.4",
  //     dstMac: "00:1A:2B:3C:4D:61",
  //     dstIp: "192.168.1.5",
  //     srcPort: "12347",
  //     dstPort: "21",
  //     protocol: "FTP",
  //     payload: "example payload",
  //     timestamp: "2024-07-16 12:37:56",
  //     label: "normal",
  //     attackType: "none",
  //     responseTime: "60ms"
  //   },
  //   {
  //     id: "5",
  //     srcMac: "00:1A:2B:3C:4D:5H",
  //     srcIp: "192.168.1.6",
  //     dstMac: "00:1A:2B:3C:4D:62",
  //     dstIp: "192.168.1.7",
  //     srcPort: "12348",
  //     dstPort: "22",
  //     protocol: "SSH",
  //     payload: "example payload",
  //     timestamp: "2024-07-16 12:38:56",
  //     label: "normal",
  //     attackType: "none",
  //     responseTime: "70ms"
  //   },
  //   {
  //     id: "6",
  //     srcMac: "00:1A:2B:3C:4D:5I",
  //     srcIp: "192.168.1.8",
  //     dstMac: "00:1A:2B:3C:4D:63",
  //     dstIp: "192.168.1.9",
  //     srcPort: "12349",
  //     dstPort: "25",
  //     protocol: "SMTP",
  //     payload: "example payload",
  //     timestamp: "2024-07-16 12:39:56",
  //     label: "normal",
  //     attackType: "none",
  //     responseTime: "80ms"
  //   },
  //   {
  //     id: "7",
  //     srcMac: "00:1A:2B:3C:4D:5J",
  //     srcIp: "192.168.1.10",
  //     dstMac: "00:1A:2B:3C:4D:64",
  //     dstIp: "192.168.1.11",
  //     srcPort: "12350",
  //     dstPort: "53",
  //     protocol: "DNS",
  //     payload: "example payload",
  //     timestamp: "2024-07-16 12:40:56",
  //     label: "normal",
  //     attackType: "none",
  //     responseTime: "90ms"
  //   },
  //   {
  //     id: "8",
  //     srcMac: "00:1A:2B:3C:4D:5K",
  //     srcIp: "192.168.1.12",
  //     dstMac: "00:1A:2B:3C:4D:65",
  //     dstIp: "192.168.1.13",
  //     srcPort: "12351",
  //     dstPort: "110",
  //     protocol: "POP3",
  //     payload: "example payload",
  //     timestamp: "2024-07-16 12:41:56",
  //     label: "normal",
  //     attackType: "none",
  //     responseTime: "100ms"
  //   },
  //   {
  //     id: "9",
  //     srcMac: "00:1A:2B:3C:4D:5L",
  //     srcIp: "192.168.1.14",
  //     dstMac: "00:1A:2B:3C:4D:66",
  //     dstIp: "192.168.1.15",
  //     srcPort: "12352",
  //     dstPort: "143",
  //     protocol: "IMAP",
  //     payload: "example payload",
  //     timestamp: "2024-07-16 12:42:56",
  //     label: "normal",
  //     attackType: "none",
  //     responseTime: "110ms"
  //   },
  //   {
  //     id: "10",
  //     srcMac: "00:1A:2B:3C:4D:5M",
  //     srcIp: "192.168.1.16",
  //     dstMac: "00:1A:2B:3C:4D:67",
  //     dstIp: "192.168.1.17",
  //     srcPort: "12353",
  //     dstPort: "443",
  //     protocol: "HTTPS",
  //     payload: "example payload",
  //     timestamp: "2024-07-16 12:43:56",
  //     label: "normal",
  //     attackType: "none",
  //     responseTime: "120ms"
  //   }
  // ];
  const [trafficData, setTrafficData] = useState<FlowListItems[]>([]);
  useEffect(() => {
    request('/api/flowList', {
      ...config,
      method: 'GET',
      params: {
        pageSize: 1000,
        current: 1,
      }
    }).then((res: FlowListResponse) => {
      setTrafficData(res.data)
    })
  }, [])
  const nodes = [];
  const links = [];

  // 生成节点和链接
  trafficData.forEach((item) => {
    const srcNode = { name: item.srcIp, category: 'Source' };
    const dstNode = { name: item.dstIp, category: 'Destination' };

    // 如果源节点不存在则添加
    if (!nodes.find(node => node.name === srcNode.name)) {
      nodes.push(srcNode);
    }
    // 如果目标节点不存在则添加
    if (!nodes.find(node => node.name === dstNode.name)) {
      nodes.push(dstNode);
    }

    // 添加链接
    links.push({
      source: item.srcIp,
      target: item.dstIp,
      lineStyle: {
        normal: {
          color: 'source',
          curveness: 0.2,
          type: 'solid'
        }
      },
      symbol: ['none', 'arrow'],
      symbolSize: 10
    });
  });
  const onEvents = {
    click: (params) => {
      const node = params.data;
      if (node.category === 0) { // HTMLElement
        window.location.href = 'https://baidu.com';
      } else if (node.category === 1) { // WebGL
        window.location.href = 'https://baidu.com';
      } else if (node.category === 2) { // SVG
        window.location.href = 'https://baidu.com';
      } else if (node.category === 3) { // CSS
        window.location.href = 'https://baidu.com';
      } else if (node.category === 4) { // Other
        window.location.href = 'https://baidu.com';
      }
    }
  };
  const option = {
    legend: {
      data: ['Source', 'Destination']
    },
    series: [{
      type: 'graph',
      layout: 'force',
      animation: false,
      label: {
        position: 'right',
        formatter: '{b}'
      },

      draggable: true,
      data: nodes,
      categories: [
        { name: 'Source' },
        { name: 'Destination' }
      ],
      force: {
        edgeLength: 50,
        repulsion: 100,
        gravity: 0.1
      },
      edges: links
    }]
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '400px', width: '100%' }}
      // onEvents={{}}
      onEvents={onEvents}
    />
  );
};

