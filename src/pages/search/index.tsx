import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import GlobalInput from '../../component/Global-input';
import BookItem from '../../component/BookItem';
import style from './index.module.scss';
import fetchBooks from '@/lib/fetch-books';

import type {BookItemType} from '@/util/types';
// export const getStaticProps = async (context: GetServerSidePropsContext) => {//getServerSideProps의 context 객체에는 브라우저로 부터 받은 요청에 대한 모든 정보가 들어있다.
//     const q = context.query.q; //쿼리스트링도 들어있음.
//     const searchBooks = await fetchBooks(q as string);
//     return {
//         props: {
//             searchBooks,
//         }
//     }
// }

export default function Page() {
    //ssg에서는 빌드 시 한 번만 실행되기 때문에, 쿼리스트링을 받아올 수 없다.
    //그래서 아래와 같이 그냥 리액트 문법으로 해결한다.
    const router = useRouter();
    const q = router.query.q; //쿼리 스트링: 페이지 경로 뒤에 물음표가 붙으면 search?q=정혜진
    const [searchBooks, setSearchBooks] = useState<BookItemType[]>([]);
    const fetchSearchResult = async () => {
        const searchBooks = await fetchBooks(q as string);
        setSearchBooks(searchBooks);
    };
    useEffect(() => {
        if(q) {
            fetchSearchResult(); //쿼리스트링이 있을 때만 실행되도록
        }
    }, [q]);

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
