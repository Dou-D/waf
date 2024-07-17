import { Line } from '@ant-design/plots';
import { useState, useEffect } from 'react';
import request from 'umi-request';

const testData = [
  { month: '4月', value: 23 },
  { month: '5月', value: 4 },
  { month: '6月', value: 3.5 },
  { month: '7月', value: 5 },
];

const FlowLine: React.FC = () => {
  const [flowData, setFlowData] = useState<LineChart.FlowLineType[]>(testData);
  useEffect(() => {
    request('/api/flowLine', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res: LineChart.Response) => {
      setFlowData(res.data.flowLine);
    });
  }, []);
  const configCharts = {
    data: flowData,
    xField: 'month',
    yField: 'value',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...configCharts} />;
};

export default FlowLine;
