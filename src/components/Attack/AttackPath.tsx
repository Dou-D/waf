import React, { useEffect } from 'react';
import * as echarts from 'echarts';

export const AttackPath: React.FC = () => {
  useEffect(() => {
    // 攻击数据样本
    const attackData = [
      { 
        id: '1', 
        attackType: 'redis未授权', 
        dstIp: '192.168.10.17', 
        label: '攻击流量', 
        srcIp: '192.168.1.1', 
        time: '147ms', 
        srcPort: '437', 
        payload: '', 
        pocId: '23', 
        protocol: 'http', 
        srcMac: '00:1B:44:12:3A:A8', 
        dstPort: '80', 
        dstMac: '00:1B:44:11:3A:B7', 
        httpPayload: ''
      },
      { 
        id: '2', 
        attackType: '目录穿越', 
        dstIp: '192.168.1.6', 
        label: '攻击流量', 
        srcIp: '192.168.1.2', 
        time: '230ms', 
        srcPort: '638', 
        payload: 'example payload', 
        pocId: '45', 
        protocol: 'ftp', 
        srcMac: '00:1B:44:11:3A:B9', 
        dstPort: '21', 
        dstMac: '00:1B:44:11:3A:B8', 
        httpPayload: 'GET /../../passwd'
      },
      { 
        id: '3', 
        attackType: 'dnslog', 
        dstIp: '192.168.4.85', 
        label: '攻击流量', 
        srcIp: '192.168.1.3', 
        time: '95ms', 
        srcPort: '53', 
        payload: 'DNS query log', 
        pocId: '77', 
        protocol: 'dns', 
        srcMac: '00:1B:44:11:3A:B1', 
        dstPort: '53', 
        dstMac: '00:1B:44:11:3A:B2', 
        httpPayload: ''
      },
      { 
        id: '4', 
        attackType: 'DDoS', 
        dstIp: '192.168.9.67', 
        label: '攻击流量', 
        srcIp: '192.168.1.4', 
        time: '1200ms', 
        srcPort: '80', 
        payload: 'Massive request payload', 
        pocId: '34', 
        protocol: 'http', 
        srcMac: '00:1B:44:11:3A:B3', 
        dstPort: '443', 
        dstMac: '00:1B:44:11:3A:B4', 
        httpPayload: 'POST /api/load'
      },
      { 
        id: '5', 
        attackType: '目录穿越', 
        dstIp: '192.168.9.67', 
        label: '攻击流量', 
        srcIp: '192.168.1.5', 
        time: '200ms', 
        srcPort: '443', 
        payload: 'directory traversal attempt', 
        pocId: '56', 
        protocol: 'https', 
        srcMac: '00:1B:44:11:3A:B5', 
        dstPort: '80', 
        dstMac: '00:1B:44:11:3A:B6', 
        httpPayload: 'GET /../win.ini'
      }
    ];

    // 连接数据，包括源节点、目标节点和攻击类型
    const edgesData = [
      { source: '1', target: '2', attackType: 'DDoS', label: { show: true, formatter: 'Relationship A' }, lineStyle: { curveness: 0.2 }},
      { source: '2', target: '3', attackType: 'redis未授权', label: { show: true, formatter: 'Relationship A' }, lineStyle: { curveness: 0.4 } },
      { source: '3', target: '4', attackType: '目录穿越', label: { show: true, formatter: 'Relationship A' }, lineStyle: { curveness: 0.2 } },
      { source: '4', target: '2', attackType: 'dnslog',label: { show: true, formatter: 'Relationship A' }, lineStyle: { curveness: 0 } },
      { source: '2', target: '5', attackType: 'redis未授权',label: { show: true, formatter: 'Relationship B' }, lineStyle: { curveness: 0.35 } },
      { source: '3', target: '2', attackType: 'dnslog',label: { show: true, formatter: 'Relationship B' }, lineStyle: { curveness: 0.45 } },
      { source: '4', target: '3', attackType: '目录穿越',label: { show: true, formatter: 'Relationship B' }, lineStyle: { curveness: 0.4 } },
      { source: '5', target: '4', attackType: 'redis未授权',label: { show: true, formatter: 'Relationship B' }, lineStyle: { curveness: 0.45 } },
      { source: '5', target: '2', attackType: 'DDoS',label: { show: true, formatter: 'Relationship B' }, lineStyle: { curveness: 0.1 } },
      { source: '5', target: '1', attackType: '目录穿越',label: { show: true, formatter: 'Relationship B' }, lineStyle: { curveness: 0.3 } },
      { source: '4', target: '4', attackType: 'redis未授权',label: { show: true, formatter: 'Relationship B' }, lineStyle: { curveness: 0.32 } },
      { source: '2', target: '5', attackType: 'DDoS',label: { show: true, formatter: 'Relationship B' }, lineStyle: { curveness: 0.3 } },
    ];

    // ECharts 配置
    const option = {
      title: {
        text: '网络攻击可视化'
      },
      tooltip: {
        trigger: 'item', // 触发类型：数据项图形触发
        formatter: function (params: any) {
          // 定制显示的内容
          const data = params.data.value;
          return `
            ID: ${data?.id}<br>
            Attack Type: ${data?.attackType}<br>
            Source IP: ${data?.srcIp}<br>
            Destination IP: ${data?.dstIp}<br>
            Destination Port: ${data?.dstPort}<br>
            Time: ${data?.time}<br>
            Label: ${data?.label}<br>
            Payload: ${data?.payload}<br>
            PocId: ${data?.pocId}<br>
            Source Port: ${data?.srcPort}<br>
            Source Mac: ${data?.srcMac}<br>
            Destination Mac: ${data?.dstMac}<br>
            Protocol: ${data?.protocol}<br>
            HttpPayload: ${data?.httpPayload}<br>
            脆弱点
          `;
        }
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'none',
          symbolSize: 50,
          roam: true,
          label: {
            show: true,
            formatter: function (node: any) {
              return `${node.data.value.dstIp}`;
            },
            position: 'right',
            fontSize: 16
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            show: true,
            formatter: function (edge: any) {
              return edge.data.data.attackType;  // 显示连接上的攻击类型
            },
            fontSize: 12
          },
          data: attackData.map(item => ({
            name: item.id,
            x: Math.random() * 800,
            y: Math.random() * 600,
            value: item
          })),
          edges: edgesData.map(edge => ({
            source: edge.source,
            target: edge.target,
            data: edge,
            lineStyle: {
              curveness: edge.lineStyle.curveness  // 确保这里从 edge 对象的 lineStyle 属性中读取曲率
            },
          }))
        }
      ]
    };

    // 初始化 ECharts 实例并将其绑定到 DOM 元素
    const chartDom = document.getElementById('main')!;
    const chart = echarts.init(chartDom);
    chart.setOption(option);
  }, []);

  return (
    <div id="main" style={{ width: '100%', height: '800px' }}></div>
  );
};

