import { message, notification } from 'antd';
import { extend, RequestOptionsInit } from 'umi-request';

// export const config = {
//   timeout: 1000 * 60,
//   errorConfig: {
//     errorHandler(error: any) {
//       const { response } = error;
//       if (response && response.status === 500) {
//         message.error('请求错误：服务器故障，请稍后再试');
//       }
//     },
//     errorThrower() {},
//   },
//   requestInterceptors: [
//     (config: any) => {
//       let token = localStorage.getItem('token') || '';
//       if (token.startsWith('"')) {
//         token = JSON.parse(token);
//       }
//       if (token) {
//         config.headers.Authorization = 'Bearer ' + token;
//       }
//       config.headers['Content-Type'] = 'application/json';
//       return config;
//     },
//     (error: any) => {
//       return error;
//     },
//   ],
//   responseInterceptors: [
//     (response: any) => {
//       const { data, message } = response;
//       if (data.status !== 200) {
//         message.error(message);
//       } else if (data.status === 200) {
//         message.success(message);
//       }
//       return data;
//     },
//   ],
// };

interface Response {
  data: any;
  message: string;
  status: string;
}
const request = extend({
  baseURL: '/',
  headers: {},
  timeout: 1000 * 60,
});

request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  const token = localStorage.getItem('token') || null;
  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return {
    url,
    options,
  };
});

request.interceptors.response.use(async (response: Response) => {
    const data = await response.clone().json();
    if (data.status !== 200) {
      message.error(data.message);
    } else if (data.status === 200) {
      message.success(data.message);
    }
    return response;
  }, (error: any) => {
    const { response } = error;
    if (response && response.status) {
      handleResponseError(response.status, error.message);
    }
    return Promise.reject(error);
  });
  
  function handleResponseError(status: number, message: string) {
    switch (status) {
      case 500:
        notification.error({message: })
        break;
      case 401:
        message.error('未经授权的访问');
        break;
      // 添加更多错误处理逻辑
      default:
        message.error(`请求错误：${message}`);
        break;
    }
  }
  