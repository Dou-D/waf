import { Navigate, Outlet } from 'umi';

export default function Auth() {
  const isLogin = localStorage.getItem('token');
  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}
