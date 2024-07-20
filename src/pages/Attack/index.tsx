import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import request from 'umi-request';

const Attack: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [attackData, setAttackData] = useState<Attack.AttackItems[]>([]);

  useEffect(() => {
    request('/api/attackList', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res: Attack.AttackResponse) => {
      setAttackData(res.data);
    });
  }, []);

  useEffect(() => {
    if (chartRef.current && attackData.length > 0) {
      const myChart = echarts.init(chartRef.current);

      const nodes = Array.from(new Set(attackData.flatMap(item => [item.srcIp, item.dstIp]))).map(ip => ({
        name: ip,
        x: Math.random() * 800,
        y: Math.random() * 600
      }));

      const links = attackData.map(item => ({
        source: item.srcIp,
        target: item.dstIp
      }));

      const option = {
        title: {
          text: 'Attack Graph',
        },
        tooltip: {},
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
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20,
            },
            data: nodes,
            links: links,
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
            },
          },
        ],
      };

      myChart.setOption(option);

      const handleResize = () => {
        myChart.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        myChart.dispose();
      };
    }
  }, [attackData]);

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
};

export default Attack;
