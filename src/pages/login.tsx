import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, notification, theme } from 'antd';
import request from 'umi-request';
import { history } from 'umi'
interface LoginParams {
  username: string
  password: string
}
interface LoginResponse {
  data: any
  message: string
  status: number
}
const Page = () => {
  const { token } = theme.useToken();
  if (localStorage.getItem('token')) {
    notification.info({ message: '您已经登录' })
    history.replace('/')
    return
  }
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"

        onFinish={async (values: LoginParams) => {
          const res: LoginResponse = await request('/api/login', {
            method: 'post',
            data: {
              account: values.username,
              password: values.password
            }
          })
          if (res.status !== 200) {
            notification.error({ message: res.message })
            return
          }
          localStorage.setItem('token', res.data)
          history.replace('/')
          notification.info({ message: '登录成功' })
        }}
      >
        <>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: (
                <UserOutlined
                  style={{
                    color: token.colorText,
                  }}
                  className={'prefixIcon'}
                />
              ),
            }}
            placeholder={'用户名'}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: (
                <LockOutlined
                  style={{
                    color: token.colorText,
                  }}
                  className={'prefixIcon'}
                />
              ),
            }}
            placeholder={'密码'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};