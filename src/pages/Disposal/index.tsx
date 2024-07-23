import React, { memo } from 'react';
import { Button, Form, Input, notification } from 'antd';
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
            ip: values.ip
        }
    }).then(() => {
        openNotification('封禁IP${values.ip}');
    });
};

const onFinishUnban: FormProps<{ ip: string }>['onFinish'] = (values) => {
    openNotification(`解封IP${values.ip}`);
};

const onFinishAddWhitelist: FormProps<{ ip: string }>['onFinish'] = (values) => {
    openNotification(`添加IP${values.ip}到白名单`);
};

const onFinishRemoveWhitelist: FormProps<{ ip: string }>['onFinish'] = (values) => {
    openNotification(`从白名单中移除IP${values.ip}`);
};

const onFinishRateLimit: FormProps<{ ip: string, limit: string }>['onFinish'] = (values) => {
    openNotification('设置IP限速');
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

            <label>解封IP</label>
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
                    label="IP"
                    name="ip"
                    rules={[{ required: true, message: '请输入要解封的IP地址' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        解封
                    </Button>
                </Form.Item>
            </Form>

            <label>添加IP到白名单</label>
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
                    label="IP"
                    name="ip"
                    rules={[{ required: true, message: '请输入要添加到白名单的IP地址' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                </Form.Item>
            </Form>

            <label>从白名单中移除IP</label>
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
                    rules={[{ required: true, message: '请输入要从白名单中移除的IP地址' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        移除
                    </Button>
                </Form.Item>
            </Form>

            <label>设置IP限速</label>
            <Form
                name="rateLimit"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinishRateLimit}
                autoComplete="off"
            >
                <Form.Item<string>
                    label="IP"
                    name="ip"
                    rules={[{ required: true, message: '请输入要限速的IP地址' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<string>
                    label="限速"
                    name="limit"
                    rules={[{ required: true, message: '请输入限速值' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        限速
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default memo(Disposal)
