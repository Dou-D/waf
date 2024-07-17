import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import request from 'umi-request';

export const AttackPath: React.FC = () => {
  const [trafficData, setTrafficData] = useState<PageData.FlowListItems[]>([]);
  useEffect(() => {
    request('/api/flowList', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'GET',
      params: {
        pageSize: 10,
        current: 1,
      }
    }).then((res: PageData.FlowListResponse) => {
      setTrafficData(res.data.flows)
    })
  }, [])
  const nodes = [];
  const links = [];

  // 生成节点和链接
  trafficData.forEach((item) => {
    const srcNode = { name: item.srcIp, category: 'Source', from: "http://www.baidu.com" };
    const dstNode = { name: item.dstIp, category: 'Destination', from: "http://www.google.com" };

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
      console.log(params, "params");
      window.location.href = node.from
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

