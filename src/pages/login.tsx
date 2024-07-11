import TextInput from '@/components/TextInput';
import { useState } from 'react';
// @ts-ignore
import { Col, Row, notification, Button } from 'antd';
import { history } from 'umi';
import request from 'umi-request';

async function submit({ account, password }) {
  const res = await request('/api/login', {
    method: 'POST',
    data: {
      account,
      password,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status !== 200) {
    notification.info({
      message: res.message,
      placement: 'topRight'
    })
    return;
  }
  localStorage.setItem('token', res.data.token);
  history.push('/');
}

function GoBack() {
  history.back();
}
export default function () {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="w-full flex justify-center">
      <div className="container lg:px-64 px-8 pt-16">
        <p className="text-3xl font-extrabold">用户登入</p>
        <div className="mt-8">
          <p>邮箱</p>
          <TextInput value={account} onChange={setAccount} />
          <p className="mt-4">密码</p>
          <TextInput value={password} onChange={setPassword} />
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <Button type="primary" size='large' onClick={() => submit({ account, password })}>登入</Button>
            </Col>
            <Col span={4}>
              <Button type="primary" size='large' onClick={GoBack}>返回</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
