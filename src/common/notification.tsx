import { notification } from 'antd';
import React from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface Iprops {
  message: string;
  type: NotificationType;
}

export const MyNotification: React.FC<Iprops> = ({ message, type }) => {
  const [api, contextHolder] = notification.useNotification();

  React.useEffect(() => {
    api[type]({
      message: message,
    });
  }, [message, type, api]);

  return <>{contextHolder}</>;
};
