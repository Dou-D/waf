import React, { memo } from 'react';
import { Button, Col, Form, Input, notification, Row, Switch } from 'antd';
import type { FormProps } from 'antd';
import request from 'umi-request';

const openNotification = (message: string) => {
  notification.success({
    message: message,
    description: `${message}成功`,
  });
};

const onFinishBan: FormProps<{ ip: string }>['onFinish'] = (values) => {
  request('/api/manualBan', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'POST',
    data: {
      ip: values.ip,
      type: '封禁IP',
    },
  }).then(() => {
    openNotification(`封禁IP:${values.ip}`);
  });
};

const onFinishUnban: FormProps<{ ip: string }>['onFinish'] = (values) => {
  request('/api/manualBan', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'POST',
    data: {
      ip: values.ip,
      type: '封禁端口',
    },
  }).then(() => {
    openNotification(`封禁端口:${values.ip}`);
  });
};

const onFinishAddWhitelist: FormProps<{ ip: string }>['onFinish'] = (values) => {
  request('/api/manualBan', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'POST',
    data: {
      ip: values.ip,
      type: '扫描遏制',
    },
  }).then(() => {
    openNotification(`封禁:${values.ip}的内部服务`);
  });
};

const onFinishRemoveWhitelist: FormProps<{ ip: string }>['onFinish'] = (values) => {
  request('/api/manualBan', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'POST',
    data: {
      ip: values.ip,
      type: '封禁内部主机',
    },
  }).then(() => {
    openNotification(`隔离:${values.ip}的内部主机`);
  });
};

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
