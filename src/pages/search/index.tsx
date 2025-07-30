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

//쿼리스트링이 빠져 있는 이유는, getStaticProps가 빌드 시점에 실행되어 미리 HTML을 생성하기 때문에 “요청마다 달라지는” 쿼리스트링을 알 수 없기 때문입니다.
//getStaticProps 여기서 제공하는 context 객체 목록
// params?: P;            // [id] 같은 동적 경로 파라미터
//   preview: boolean;      // 미리보기 모드
//   previewData?: unknown; // 미리보기 데이터
//   locale?: string;       // i18n 로케일
//   locales?: string[];    // 지원 로케일 목록
//   defaultLocale?: string;// 기본 로케일

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
