import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState, useEffect } from 'react';
import type { TrendType, FlowCardData, FlowCardResponse } from './typings';
import FlowLine from '../LineChart/FlowLine';
import request from 'umi-request';
import { config } from '@/utils';

const { Statistic } = StatisticCard;



export const FlowObserve: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  const [flowCardData, setFlowCardData] = useState<FlowCardData[]>();
  useEffect(() => {
    request('/api/flowCard', {
      ...config,
      method: 'GET',
    }).then((res:FlowCardResponse)  => {
      setFlowCardData(res.data.flowCardData)
      
    })
  }, []);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="数据概览"
        extra={new Date().toLocaleDateString()}
        split={responsive ? 'horizontal' : 'vertical'}
        headerBordered
        bordered
      >
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              {flowCardData?.map((item) => {
                return (
                  <StatisticCard
                    key={item.id}
                    statistic={{
                      title: item.title,
                      value: item.value,
                      description: (
                        <Statistic
                          title={item.description.title}
                          value={item.description.value}
                          trend={item.description.trend as TrendType}
                        />
                      ),
                    }}
                  />
                );
              })}
            </ProCard>
          </ProCard>
          <StatisticCard title="流量走势">
            <FlowLine />
          </StatisticCard>
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};

