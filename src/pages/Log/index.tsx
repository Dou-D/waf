import { useEffect, useState } from 'react';
import { BanLogTable, CommonLogTable, ManualLogTable } from '@/components/Log';
import { Button } from 'antd';

const toolbarMenu = [
  { key: 'common', label: <span>普通日志</span> },
  { key: 'manual', label: <span>手动判断日志</span> },
  { key: 'ban', label: <span>禁用日志</span> },
]
export default () => {
  const [activeKey, setActiveKey] = useState<PageLog.MenuType>('common');
  const renderTable = () => {
    switch (activeKey) {
      case 'manual':
        return <ManualLogTable />;
      case 'ban':
        return <BanLogTable />;
      default:
        return <CommonLogTable />;
    }
  };
  useEffect(() => {

  }, [activeKey])
  return (
    <>
      {toolbarMenu.map((menu) => (
        <Button
          key={menu.key}
          onClick={() => setActiveKey(menu.key as PageLog.MenuType)}
          style={{ marginRight: 16, cursor: 'pointer' }}
          type={activeKey === menu.key ? 'primary' : 'default'}
        >
          {menu.label}
        </Button>
      ))}
      <div style={{ marginTop: 24 }}>
        {renderTable()}
      </div>
    </>
  );
};