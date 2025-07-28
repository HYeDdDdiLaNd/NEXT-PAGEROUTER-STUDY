import style from './index.module.scss';
import GlobalInput from '../component/Global-input';
import BookItem from '../component/BookItem';
import { ReactNode } from 'react';
import { InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/random-books';

//오직 한번만 서버측에서 실행되는 함수
export const getServerSideProps = async() => {
    
    //직렬임. allBooks 불러오고, 끝나면 recommendBooks 불러오고
    // const allBooks = await fetchBooks();
    // const recommendBooks = await fetchRandomBooks();

    //병렬로 한번에 받아올 수 있도록 변경
    const [allBooks, recommendBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()])//all() 인수로 전달한 배열 안에 들어있는 모든 비동기 함수르 한 번에 실행.
    return {
        props: {
            allBooks,
            recommendBooks,
        }
    }

}
export default function Home({allBooks, recommendBooks} : InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(allBooks); //이렇게하면 두번 콘솔에 출력된다. 1. 서버사이드렌더링 사전 렌더링 시, 2. js번들로 전달될때 브라우저에서 한번
  return (
    <div className={style.home}>
      <section className={style.section}>
        <h3>지금 추천하는 도서</h3>
        <div className={style.booksWrap}>
          <ul>
            {recommendBooks.map((bookItem) => (
              <BookItem key={bookItem.id} {...bookItem} />
            ))}
          </ul>
        </div>
      </section>
      <section className={style.section}>
        <h3>도서 전체보기</h3>
        <div className={style.booksWrap}>
          <ul>
            {allBooks.map((bookItem) => (
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
