import { StatisticCard } from '@ant-design/pro-components';
import React from 'react';
import { Statistic } from './typings';

interface SimpleStatisticProps {
  data: Statistic[];
}

const SimpleStatistic: React.FC<SimpleStatisticProps> = (prop) => {
  const { data } = prop
  return (
    <StatisticCard.Group>
      {data.map((item) => (
        <StatisticCard
          key={item.title}
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
