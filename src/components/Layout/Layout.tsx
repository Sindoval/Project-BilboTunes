import { Outlet } from 'react-router-dom';
import Header from '../Hader/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
