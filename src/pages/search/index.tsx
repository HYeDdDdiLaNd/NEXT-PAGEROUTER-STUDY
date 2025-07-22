import { useRouter } from 'next/router';
import GlobalInput from '../../component/Global-input';
import { ReactNode } from 'react';

export default function Page() {
  const router = useRouter();
  console.log(router);
  const { q } = router.query; //쿼리 스트링: 페이지 경로 뒤에 물음표가 붙으면 search?q=정혜진

  return (
    <>
      <h2>{q}search 룰루리</h2>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <GlobalInput>{page}</GlobalInput>;
};
