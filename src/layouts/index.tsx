import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Layout, Menu, theme } from 'antd';
import 'antd/dist/reset.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import React, { useState } from 'react';
import { Link, Outlet } from 'umi';

const { Header, Content, Sider } = Layout;

const BreadcrumbItems: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const sliderItemsData = [
  {
    key: '1',
    label: '首页',
    path: '/dashboard',
  },
  {
    key: '2',
    label: '数据',
    path: '/attack',
  },
  {
    key: '3',
    label: '研判',
    path: '/analysis',
  },
  {
    key: '4',
    label: '处置',
    path: '/disposal',
  },
  {
    key: '5',
    label: '联动',
    path: '/linkage',
  },
  {
    key: '6',
    label: '日志',
    path: '/logs',
  },
  {
    key: '7',
    label: '设置',
    path: '/settings',
  },
];

const sliderItems: MenuProps['items'] = sliderItemsData.map((item) => {
  const key = String(item.key);

  return {
    key: key,
    label: <Link to={item.path}>{item.label}</Link>,
  };
});

const Layouts:React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ title: string }[]>([
    { title: 'Home' },
  ]);

  function findMenuItemByKey(key: string, menuItems: MenuProps['items']): any {
    if (!menuItems) return null;
    for (const item of menuItems) {
      if (item?.key === key) {
        return item;
      }
    }
  }

  const handleMenuClick = (e: any, menuItems: MenuProps['items']) => {
    const clickedItem = findMenuItemByKey(e.key, menuItems);
    console.log(e);

    if (clickedItem) {
      setBreadcrumbItems([
        { title: 'Home' },
        { title: clickedItem.label as string },
      ]);
    }
  };

  function itemRender(currentRoute, params, items, paths) {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;

    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <Link to={`/${paths.join('/')}`}>{currentRoute.title}</Link>
    );
  }

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={BreadcrumbItems}
          style={{ flex: 1, minWidth: 0 }}
          onClick={(e) => handleMenuClick(e, BreadcrumbItems)}
        />
        <Link to="/login">
          <Avatar
            src={
              <img
                src={
                  'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
                }
                alt="avatar"
              />
            }
          />
        </Link>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={sliderItems}
            onClick={(e) => handleMenuClick(e, sliderItems)}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={breadcrumbItems}
            itemRender={itemRender}
          ></Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Layouts;
