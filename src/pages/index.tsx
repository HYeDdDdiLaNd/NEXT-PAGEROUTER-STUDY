import style from './index.module.scss';
import GlobalInput from '../component/Global-input';
import BookItem from '../component/BookItem';
import { ReactNode } from 'react';
import books from '@/mock/books.json';
export default function Home() {
  return (
    <div className={style.home}>
      <section className={style.section}>
        <h3>지금 추천하는 도서</h3>
        <div className={style.booksWrap}>
          <ul>
            {books.map((bookItem) => (
              <BookItem key={bookItem.id} {...bookItem} />
            ))}
          </ul>
        </div>
      </section>
      <section className={style.section}>
        <h3>도서 전체보기</h3>
        <div className={style.booksWrap}>
          <ul>
            {books.map((bookItem) => (
              <BookItem key={bookItem.id} {...bookItem} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <GlobalInput>{page}</GlobalInput>;
};
