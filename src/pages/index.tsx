import style from './index.module.scss';
import GlobalInput from '../component/Global-input';
import BookItem from '../component/BookItem';
import { ReactNode } from 'react';
import books from '@/mock/books.json';
import { InferGetServerSidePropsType } from 'next';

//오직 한번만 서버측에서 실행되는 함수
export const getServerSideProps = () => {
    const data = 'qqq';

    console.log('ddd');
    
    return {
        props: {
            data
        }
    }

}
export default function Home({data} : InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(data); //이렇게하면 두번 콘솔에 출력된다. 1. 서버사이드렌더링 사전 렌더링 시, 2. js번들로 전달될때 브라우저에서 한번
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
