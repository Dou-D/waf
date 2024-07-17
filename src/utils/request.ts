// import { message } from 'antd';

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
