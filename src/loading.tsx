import { Spin } from 'antd';
import React from 'react';

const GlobalLoading: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default GlobalLoading;
