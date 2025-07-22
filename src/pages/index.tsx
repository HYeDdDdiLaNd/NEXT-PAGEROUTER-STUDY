import style from './index.module.scss';
import GlobalInput from '../component/Global-input';
import { ReactNode } from 'react';
export default function Home() {
  return (
    <>
      <h2 className={style.h1}>인덱스 룰루리</h2>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <GlobalInput>{page}</GlobalInput>;
};
