import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import GlobalInput from '../../component/Global-input';
import BookItem from '../../component/BookItem';

import style from './index.module.scss';
import books from '@/mock/books.json';

export default function Page() {
  const router = useRouter();
  console.log(router);
  const { q } = router.query; //쿼리 스트링: 페이지 경로 뒤에 물음표가 붙으면 search?q=정혜진

  return (
    <div className={style.Search}>
      <ul>
        {books.map((bookItem) => (
          <BookItem key={bookItem.id} {...bookItem} />
        ))}
      </ul>
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <GlobalInput>{page}</GlobalInput>;
};
