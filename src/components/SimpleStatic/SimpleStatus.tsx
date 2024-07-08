import { StatisticCard } from '@ant-design/pro-components';
import React from 'react';
import { Statistic } from './typings';

interface SimpleStatisticProps {
  data: Statistic[];
}

const SimpleStatistic: React.FC<SimpleStatisticProps> = ({ data }) => {
  return (
    <StatisticCard.Group>
      {data.map((item, index) => (
          <StatisticCard
            statistic={{
              title: item.title,
              tip: item.tip,
              value: item.value,
              status: item.status,
            }}
          />
      ))}
    </StatisticCard.Group>
  );
};

export default SimpleStatistic;
