// import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import GlobalInput from '../../component/Global-input';
import BookItem from '../../component/BookItem';
import style from './index.module.scss';
import fetchBooks from '@/lib/fetch-books';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {//getServerSideProps의 context 객체에는 브라우저로 부터 받은 요청에 대한 모든 정보가 들어있다.
    const q = context.query.q; //쿼리스트링도 들어있음.
    const searchBooks = await fetchBooks(q as string);
    return {
        props: {
            searchBooks,
        }
    }
}

export default function Page({searchBooks}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  //const router = useRouter();
//   console.log(router);
//   const { q } = router.query; //쿼리 스트링: 페이지 경로 뒤에 물음표가 붙으면 search?q=정혜진

  return (
    <div className={style.Search}>
      <ul>
        {searchBooks.map((bookItem) => (
          <BookItem key={bookItem.id} {...bookItem} />
        ))}
      </ul>
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <GlobalInput>{page}</GlobalInput>;
};
