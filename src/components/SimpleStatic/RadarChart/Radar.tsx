import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import request from 'umi-request'

export const Radar: React.FC = () => {
  const option = {
    title: [
      {
        text: '客户端',
        left: '50%',
        top: '10%',
        textAlign: 'center',
      },
      {
        left: '75%',
        top: '10%',
        textAlign: 'center',
      },
    ],
    tooltip: {},
    // legend: {
    //   data: ['电脑类型', '浏览器'],
    //   left: 'center',
    //   top: 'bottom'
    // },
    radar: [
      {
        indicator: [
          { name: "Windows", max: 2000 },
          { name: "macOS", max: 2000 },
          { name: "Linux", max: 2000 },
          { name: "Android", max: 2000 },
          { name: "iOS", max: 2000 },
        ],
        center: ['25%', '60%'],
        radius: 80
      },
      {
        indicator: [
          { name: "Chrome", max: 2000 },
          { name: "Firefox", max: 2000 },
          { name: "Safari", max: 2000 },
          { name: "Edge", max: 2000 },
          { name: "Opera", max: 2000 },
          { name: "Internet Explorer", max: 2000 },
        ],
        center: ['75%', '60%'],
        radius: 80
      }
    ],
    series: [
      {
        name: '电脑类型',
        type: 'radar',
        radarIndex: 0,
        data: [
          {
            value: [] as number[],
            name: '电脑类型'
          }
        ]
      },
      {
        name: '浏览器',
        type: 'radar',
        radarIndex: 1,
        data: [
          {
            value: [] as number[],
            name: '浏览器'
          }
        ]
      }
    ]
  };

  const [result, setResult] = useState<typeof option>(option)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    request('/api/radar', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'GET'
    }).then((res: RadarChart.RadarResponse) => {
      option.series[0].data[0].value = res.data.series[0].value
      option.series[1].data[0].value = res.data.series[1].value
      setResult(option)
      setLoading(false)
    })
  }, []);

  const loadingOption = {
    text: '加载中...',
    color: '#4413c2',
    textColor: '#270240',
    maskColor: 'rgba(194, 88, 86, 0.3)',
    zlevel: 0
  };

  return (
    <ReactECharts
      option={result}
      style={{ height: 400 }}
      loadingOption={loadingOption}
      showLoading={loading}
    />
  );
};
