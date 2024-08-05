import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { useAppDispatch, useAppSelector } from '@/store';
import { ComposeOption, GraphSeriesOption, TitleComponentOption, TooltipComponentOption, } from 'echarts';
export type ECOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GraphSeriesOption
>;
const attackData = [
  {
    id: '1',
    attackType: 'redis未授权',
    dstIp: '192.168.10.17',
    label: '攻击流量',
    srcIp: '192.168.1.1',
    time: '49ms',
    srcPort: '437',
    payload: '',
    pocId: '23',
    protocol: 'http',
    srcMac: '00:1B:44:12:3A:A8',
    dstPort: '80',
    dstMac: '00:1B:44:11:3A:B7',
    httpPayload: '',
  },
  {
    id: '2',
    attackType: '目录穿越',
    dstIp: '192.168.1.6',
    label: '攻击流量',
    srcIp: '192.168.1.2',
    time: '12ms',
    srcPort: '638',
    payload: 'example payload',
    pocId: '45',
    protocol: 'ftp',
    srcMac: '00:1B:44:11:3A:B9',
    dstPort: '21',
    dstMac: '00:1B:44:11:3A:B8',
    httpPayload: 'GET /../../passwd',
    vulnerability: true,
    fragile: 60,
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
    httpPayload: '',
    vulnerability: false,
    fragile: 0,
  },
  {
    id: '4',
    attackType: 'DDoS',
    dstIp: '192.168.9.67',
    label: '攻击流量',
    srcIp: '192.168.1.4',
    time: '53ms',
    srcPort: '80',
    payload: 'Massive request payload',
    pocId: '34',
    protocol: 'http',
    srcMac: '00:1B:44:11:3A:B3',
    dstPort: '443',
    dstMac: '00:1B:44:11:3A:B4',
    httpPayload: 'POST /api/load',
    vulnerability: true,
    fragile: 90,
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
    httpPayload: 'GET /../win.ini',
    vulnerability: true,
    fragile: 45,
  },
  {
    id: '6',
    attackType: 'SQL注入',
    dstIp: '192.168.5.18',
    label: '攻击流量',
    srcIp: '192.168.2.1',
    time: '30ms',
    srcPort: '3306',
    payload: 'SQL payload',
    pocId: '67',
    protocol: 'mysql',
    srcMac: '00:1B:44:12:3A:C8',
    dstPort: '3306',
    dstMac: '00:1B:44:11:3A:C7',
    httpPayload: '',
    vulnerability: true,
    fragile: 70,
  },
  {
    id: '7',
    attackType: 'XSS',
    dstIp: '192.168.6.19',
    label: '攻击流量',
    srcIp: '192.168.2.2',
    time: '15ms',
    srcPort: '8080',
    payload: 'XSS payload',
    pocId: '89',
    protocol: 'http',
    srcMac: '00:1B:44:11:3A:D9',
    dstPort: '8080',
    dstMac: '00:1B:44:11:3A:D8',
    httpPayload: '<script>alert(1)</script>',
    vulnerability: false,
    fragile: 0,
  },
  {
    id: '8',
    attackType: '恶意软件',
    dstIp: '192.168.7.20',
    label: '攻击流量',
    srcIp: '192.168.2.2',
    time: '80ms',
    srcPort: '443',
    payload: 'malware payload',
    pocId: '92',
    protocol: 'https',
    srcMac: '00:1B:44:11:3A:E1',
    dstPort: '443',
    dstMac: '00:1B:44:11:3A:E2',
    httpPayload: '',
    vulnerability: true,
    fragile: 50,
  },
  {
    id: '9',
    attackType: '暴力破解',
    dstIp: '192.168.8.21',
    label: '攻击流量',
    srcIp: '192.168.2.4',
    time: '40ms',
    srcPort: '22',
    payload: 'brute force payload',
    pocId: '105',
    protocol: 'ssh',
    srcMac: '00:1B:44:11:3A:F3',
    dstPort: '22',
    dstMac: '00:1B:44:11:3A:F4',
    httpPayload: '',
    vulnerability: false,
    fragile: 0,
  },
  {
    id: '10',
    attackType: '社会工程学',
    dstIp: '192.168.2.4',
    label: '攻击流量',
    srcIp: '192.168.2.5',
    time: '120ms',
    srcPort: '25',
    payload: 'phishing email payload',
    pocId: '120',
    protocol: 'smtp',
    srcMac: '00:1B:44:11:3A:G5',
    dstPort: '25',
    dstMac: '00:1B:44:11:3A:G6',
    httpPayload: '',
    vulnerability: true,
    fragile: 80,
  },
];

// 连接数据，包括源节点、目标节点和攻击类型
const edgesData = [
  {
    source: '1',
    target: '2',
    attackType: 'DDoS',
    label: { show: true, formatter: 'Relationship A' },
    lineStyle: { curveness: 0.2 },
  },
  {
    source: '2',
    target: '3',
    attackType: 'redis未授权',
    label: { show: true, formatter: 'Relationship A' },
    lineStyle: { curveness: 0.4 },
  },
  {
    source: '3',
    target: '4',
    attackType: '目录穿越',
    label: { show: true, formatter: 'Relationship A' },
    lineStyle: { curveness: 0.2 },
  },
  {
    source: '4',
    target: '2',
    attackType: 'dnslog',
    label: { show: true, formatter: 'Relationship A' },
    lineStyle: { curveness: 0 },
  },
  {
    source: '2',
    target: '5',
    attackType: 'redis未授权',
    label: { show: true, formatter: 'Relationship B' },
    lineStyle: { curveness: 0.35 },
  },
  {
    source: '3',
    target: '2',
    attackType: 'dnslog',
    label: { show: true, formatter: 'Relationship B' },
    lineStyle: { curveness: 0.45 },
  },
  {
    source: '4',
    target: '3',
    attackType: '目录穿越',
    label: { show: true, formatter: 'Relationship B' },
    lineStyle: { curveness: 0.4 },
  },
  {
    source: '5',
    target: '4',
    attackType: 'redis未授权',
    label: { show: true, formatter: 'Relationship B' },
    lineStyle: { curveness: 0.45 },
  },
  {
    source: '5',
    target: '2',
    attackType: 'DDoS',
    label: { show: true, formatter: 'Relationship B' },
    lineStyle: { curveness: 0.1 },
  },
  {
    source: '5',
    target: '1',
    attackType: '目录穿越',
    label: { show: true, formatter: 'Relationship B' },
    lineStyle: { curveness: 0.3 },
  },
  {
    source: '4',
    target: '4',
    attackType: 'redis未授权',
    label: { show: true, formatter: 'Relationship B' },
    lineStyle: { curveness: 0.32 },
  },
  {
    source: '2',
    target: '5',
    attackType: 'DDoS',
    label: { show: true, formatter: 'Relationship B' },
    lineStyle: { curveness: 0.3 },
  },
];
export const AttackPath: React.FC = () => {
  const uploadState = useAppSelector((state) => state.upload.value);
  useEffect(() => {
    // ECharts 配置
    const option: ECOption = {
      title: {
        text: '网络攻击可视化',
      },
      legend: {
        data: ['普通节点', '脆弱节点', '可疑节点'],
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          const data = params.data.value;
          return `
            ID: ${data?.id}<br>
            攻击方式: ${data?.attackType}<br>
            来源IP: ${data?.srcIp}<br>
            目的IP: ${data?.dstIp}<br>
            目的端口: ${data?.dstPort}<br>
            时间: ${data?.time}<br>
            标签: ${data?.label}<br>
            Payload: ${data?.payload}<br>
            PocId: ${data?.pocId}<br>
            端口: ${data?.srcPort}<br>
            来源Mac: ${data?.srcMac}<br>
            目的Mac: ${data?.dstMac}<br>
            协议: ${data?.protocol}<br>
            HttpPayload: ${data?.httpPayload}<br>
            脆弱性: ${data?.vulnerability ? 'Yes' : 'No'}<br>
            脆弱值: ${data?.fragile || 'N/A'}
          `;
        },
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
              return `${node.data.value.dstIp}${node.data.value.vulnerability ? ' 脆弱点' : ''}`;
            },
            position: 'right',
            fontSize: 16,
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            show: true,
            formatter: function (edge: any) {
              return edge.data.data.attackType; // 显示连接上的攻击类型
            },
            fontSize: 12,
          },
          categories: [
            { name: '普通节点', itemStyle: { color: 'blue' } },
            { name: '脆弱节点', itemStyle: { color: 'red' } },
            { name: '可疑节点', itemStyle: { color: '#FAAD14' } },
          ],
          data: attackData.map((item) => ({
            name: item.id,
            x: Math.random() * 800,
            y: Math.random() * 600,
            value: item,
            category:
              item.id === '6' || item.id === '10'
                ? '可疑节点'
                : item.vulnerability
                ? '脆弱节点'
                : '普通节点',
            itemStyle: {
              color:
                item.id === '6' || item.id === '10'
                  ? '#FAAD14'
                  : item.vulnerability
                  ? 'red'
                  : 'blue',
            },
          })) as any,
          edges: edgesData.map((edge) => ({
            source: edge.source,
            target: edge.target,
            data: edge,
            lineStyle: {
              curveness: edge.lineStyle.curveness, // 确保这里从 edge 对象的 lineStyle 属性中读取曲率
            },
          })),
        },
      ],
    };

    // 初始化 ECharts 实例并将其绑定到 DOM 元素
    uploadState &&
      (function () {
        const chartDom = document.getElementById('main');
        const chart = echarts.init(chartDom);
        chart.setOption(option);
      })();
  }, [uploadState]);

  return (
    <>
      <div id="main" style={{ width: '100%', height: '800px' }}></div>
    </>
  );
};
