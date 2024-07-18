import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Drawer } from 'antd'
import request from 'umi-request';

export const AttackPath: React.FC = () => {
  const [trafficData, setTrafficData] = useState<PageData.FlowListItems[]>();
  const [path, setPath] = useState<AttackPath.AttackPathItems[]>();
  useEffect(() => {
    request('/api/getpocList', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'GET',
    }).then((res: AttackPath.AttackPathResponse) => {
      setPath(res.data)
    })
  }, [])
  const nodes = [];
  const links = [];

  // 生成节点和链接
  path?.forEach((item: AttackPath.AttackPathItems) => {
    const srcNode = { name: item.srcIp, from: item.from, content: item.content };
    const dstNode = { name: item.dstIp, from: item.from, content: item.content };

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
      setOpen(true);
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
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ReactECharts
        option={option}
        style={{ height: '400px', width: '100%' }}
        onEvents={onEvents}
      />
      <Drawer title="详情" onClose={onClose} open={open}>
        {path?.map((item: AttackPath.AttackPathItems) => {
          return (
            <div key={item.id}>
              <p>来源IP: {item.srcIp}</p>
              <p>目的IP: {item.dstIp}</p>
              <a href={item.from}>详情: {item.content}</a>
            </div>
          )
        })}
      </Drawer>
    </>
  );
};

