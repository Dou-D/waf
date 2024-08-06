import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState, useEffect } from 'react';
import FlowLine from '../LineChart/FlowLine';
import request from 'umi-request';
import { FlagResponse } from '@/common/FlagResponse';

const { Statistic } = StatisticCard;

export const FlowObserve: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  const [flowCardData, setFlowCardData] = useState<FlowObserve.FlowCardData[]>();
  const [uploadState, setUploadState] = useState<boolean>();

  useEffect(() => {
    request('/api/flowCard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'GET',
    }).then((res: FlowObserve.FlowCardResponse) => {
      setFlowCardData(res?.data?.flowCardData);
    });
    request<FlagResponse>('/api/flag', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      setUploadState(res.data);
    });
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
                          trend={item.description.trend as FlowObserve.TrendType}
                        />
                      ),
                    }}
                  />
                );
              })}
            </ProCard>
          </ProCard>
          <StatisticCard title="流量走势">{uploadState && <FlowLine />}</StatisticCard>
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};
