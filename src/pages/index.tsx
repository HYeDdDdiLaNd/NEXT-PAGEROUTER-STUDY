import style from './index.module.scss';
import GlobalInput from '../component/Global-input';
import BookItem from '../component/BookItem';
import { ReactNode } from 'react';
import { InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/random-books';

//SSG방식오직 한번만 서버측에서 실행되는 함수
export const getStaticProps = async() => {
    //console.log('getStaticProps 실행'); //서버사이드 렌더링 시에만 실행됨. 브라우저에서는 실행되지 않음.
    //직렬임. allBooks 불러오고, 끝나면 recommendBooks 불러오고
    // const allBooks = await fetchBooks();
    // const recommendBooks = await fetchRandomBooks();

    //병렬로 한번에 받아올 수 있도록 변경
    const [allBooks, recommendBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()])//all() 인수로 전달한 배열 안에 들어있는 모든 비동기 함수르 한 번에 실행.
    return {
        props: {
            allBooks,
            recommendBooks,
        }, 
        revalidate: 3, //3초마다

//ssg의 방식에서 빌드타임에서 페이지를 생성하니까 속도는 빠르지만 최신데이터를 유지하기가 어려워서 이걸 보완하고자, ISR로 페이지를 다시 생성하도록한다.
//getStaticProps 리턴 안에 revalidate 속성을 추가하면 해당 초마다 최신 페이지를 다시 그린다.
// 지금 추천하는 도서는 ssg로 생성하면 계속 같은 도서만 보여줌 ssg+ isr 기법을 되도록 이용해서 페이지를 만드는 것을 추천함.
    }

}
export default function Home({allBooks, recommendBooks} : InferGetStaticPropsType<typeof getStaticProps>) {
    //console.log(allBooks); //이렇게하면 두번 콘솔에 출력된다. 1. 서버사이드렌더링 사전 렌더링 시, 2. js번들로 전달될때 브라우저에서 한번
    //static은 SSG방식, Serverside는 SSR방식으로 페이지를 렌더링하는 방법이다. 
    //Serverside는은 최신화가 잘되고 static은 빠르지만 최신화가 잘 되지 않는다.
    //또한 statice은 빌드 시 한번 만 실행되기 때문에 쿼리 스트링 등 페이지가 렌더링 되고 나서의 변경사항을 반영할 수 없다. 
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
