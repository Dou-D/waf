import React, { memo } from 'react';
import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import request from 'umi-request';
import { config } from '@/utils';
import { DisposalRequest } from './tying';

const onFinish: FormProps<DisposalRequest>['onFinish'] = (values) => {
    request('/api/manualBan', {
        ...config,
        method: 'POST',
        data: {
            ip: values.ip
        }
    })
    
};

const Disposal: React.FC = () => {
    return (
        <>
            <label>封禁IP</label>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
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
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </>
    )
}

export default memo(Disposal)