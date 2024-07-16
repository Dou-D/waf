// @ts-ignore
import { Col, Row, notification, Button, Input } from 'antd';
import { useEffect } from 'react';
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
  localStorage.setItem('token', res.data);
  history.push('/');
}

function GoBack() {
  history.replace('/');
}
let account, password;
const handleChangeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
  account = e.target.value
}
const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
  password = e.target.value
}
export default function () {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      notification.info({
        message: '您已经登录了',
        placement: 'topRight'
      });
      GoBack()
      return;
    }
  }, []);
  return (
    <div className="w-full flex justify-center">
      <div className="container lg:px-64 px-8 pt-16">
        <p className="text-3xl font-extrabold">用户登入</p>
        <div className="mt-8">
          <p>邮箱</p>
          <Input className="w-8/12 p-2 border-2 border-gray-100
     hover:border-gray-300 focus:border-gray-500 rounded-lg my-2 outline-none
     transition-all" value={account} onChange={handleChangeAccount} />
          <p className="mt-4">密码</p>
          <Input.Password className="w-8/12 p-2 border-2 border-gray-100
     hover:border-gray-300 focus:border-gray-500 rounded-lg my-2 outline-none
     transition-all" value={password} onChange={handleChangePassword} />
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
