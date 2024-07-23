import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface AttackData {
  id: string;
  attackType: string;
  dstIp: string;
  label: string;
  srcIp: string;
  time: string;
  srcPort: string;
  payload: string;
  pocId: string;
  protocol: string;
  srcMac: string;
  dstPort: string;
  dstMac: string;
  httpPayload: string;
  vulnerability?: boolean;
  fragile?: number;
}

const attackData: AttackData[] = [
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
    fragile: 60
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
    fragile: 0
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
    fragile: 90
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
    fragile: 45
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
    fragile: 70
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
    fragile: 0
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
    fragile: 50
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
    fragile: 0
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
    fragile: 80
  }
];

export const Assets: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const filteredData = attackData.filter(item => item.vulnerability);
      const xData = filteredData.map(item => item.srcIp);
      const yData = filteredData.map(item => item.fragile);

      const option = {
        title: {
          text: '脆弱性分析'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: xData,
          name: 'srcIp(来源IP)'
        },
        yAxis: {
          type: 'value',
          name: 'Fragile(脆弱性）',
        },
        series: [
          {
            name: 'Fragile',
            type: 'bar',
            data: yData
          }
        ]
      };

      chart.setOption(option);

      return () => {
        chart.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>;
};
