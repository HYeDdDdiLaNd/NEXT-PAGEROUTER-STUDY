import style from './Global-layout.module.scss';
import Header from './common/Header';
import Footer from './common/Footer';

import type { ReactNode } from 'react';

const GlobalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.container}>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default GlobalLayout;
