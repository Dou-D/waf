import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import { TrendType } from './typings';
import FlowLine from '../LineChart/FlowLine';
import { Locale } from '../LineChart/Locale';

const { Statistic } = StatisticCard;

const items1 = [
  {
    id: 1,
    title: '昨日全部流量',
    value: 234,
    description: {
      title: '较本月平均流量',
      value: '8.04%',
      trend: 'down',
    },
  },
  {
    id: 2,
    title: '本月累计流量',
    value: 234,
    description: {
      title: '月同比',
      value: '8.04%',
      trend: 'up',
    },
  },
];

const item2 = [
  {
    id: 1,
    title: '拦截数',
    value: '12/56',
    suffix: '个',
  },
  {
    id: 2,
    title: '历史拦截总数',
    value: '134',
    suffix: '个',
  },
];

const flowObserveItems = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
];

export default () => {
  const [responsive, setResponsive] = useState(false);

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
              {items1.map((item) => {
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
