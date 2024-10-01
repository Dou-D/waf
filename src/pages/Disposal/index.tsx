import React, { memo } from 'react';
import { Button, Col, Form, Input, notification, Row, Switch } from 'antd';
import request from 'umi-request';

const openNotification = (message: string) => {
  notification.success({
    message: message,
    description: `${message}成功`,
  });
};

const handleAction = (values, actionType) => {
  request('/api/manualBan', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'POST',
    data: {
      ip: values.ip,
      type: actionType,
    },
  }).then(() => {
    const notifications = {
      '封禁IP': `封禁IP:${values.ip}`,
      '封禁端口': `封禁端口:${values.ip}`,
      '扫描遏制': `封禁:${values.ip}的内部服务`,
      '封禁内部主机': `隔离:${values.ip}的内部主机`,
    };
    openNotification(notifications[actionType]);
  });
};

const onFinishBan = (values) => handleAction(values, '封禁IP');
const onFinishUnban = (values) => handleAction(values, '封禁端口');
const onFinishAddWhitelist = (values) => handleAction(values, '扫描遏制');
const onFinishRemoveWhitelist = (values) => handleAction(values, '封禁内部主机');

const onFinishRateLimit = () => {
  notification.success({
    message: '操作成功',
  });
};

const Disposal: React.FC = () => {
  return (
    <>
      <label>封禁IP</label>
      <Form
        name="ban"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinishBan}
        autoComplete="off"
      >
        <Form.Item<string>
          label="IP"
          name="ip"
          rules={[{ required: true, message: '请输入要封禁的IP地址' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            封禁
          </Button>
        </Form.Item>
      </Form>

      <label>封禁内部端口</label>
      <Form
        name="unban"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinishUnban}
        autoComplete="off"
      >
        <Form.Item<string>
          label="IP:Port"
          name="ip"
          rules={[{ required: true, message: '请输入要封禁的端口' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            封禁
          </Button>
        </Form.Item>
      </Form>

      <label>扫描遏制</label>
      <Form
        name="addWhitelist"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinishAddWhitelist}
        autoComplete="off"
      >
        <Form.Item<string>
          label="User-Agent"
          name="ip"
          rules={[{ required: true, message: '请输入要扫描遏制的地址' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            封禁
          </Button>
        </Form.Item>
      </Form>

      <label>隔离内部主机</label>
      <Form
        name="removeWhitelist"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinishRemoveWhitelist}
        autoComplete="off"
      >
        <Form.Item<string>
          label="IP"
          name="ip"
          rules={[{ required: true, message: '请输入要隔离内部主机的地址' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            隔离
          </Button>
        </Form.Item>
      </Form>

      <Row gutter={16}>
        <Col>
          <label>高频访问增加验证码:</label>
        </Col>
        <Col span={16} offset={1}>
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            defaultChecked
            onChange={onFinishRateLimit}
          />
        </Col>
      </Row>
    </>
  );
};

export default memo(Disposal);
