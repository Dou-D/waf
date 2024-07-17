import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import request from 'umi-request';
import { config } from '@/utils';
import { FlowListItems, FlowListResponse } from '@/pages/Data/typings';

export const AttackPath: React.FC = () => {
  const [trafficData, setTrafficData] = useState<FlowListItems[]>([]);
  useEffect(() => {
    request('/api/flowList', {
      ...config,
      method: 'GET',
      params: {
        pageSize: 10,
        current: 1,
      }
    }).then((res: FlowListResponse) => {
      setTrafficData(res.data.flows)
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

