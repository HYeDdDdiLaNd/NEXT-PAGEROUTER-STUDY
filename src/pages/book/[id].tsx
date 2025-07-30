//url 파라미터: 파일명에 [] + 동적변경되는 값이 들어오면 []에 어떤 값이 들어오던 페이지로써 렌더링함.
//만약 url 파라미터로 여러 값을 넣고 싶다면 (ex: 123/345/657)
//파일명을 [id]가 아닌 [...id]로 넣으면 된다. (배열 형태로 저장된다.) : catch all segment

/* 
  /book/123/234
  /book/123
  
  뿐만 아니라
  /book 에도 대응할 수 있는 범용적인 페이지를 만들고 싶다면

  [[...id]] 라고 파일 네이밍을 하며 된다. 혹은 그냥 index.tsx를 만들면됨.

*/

//import { useRouter } from 'next/router';

//import type { BookItem } from '@/util/types';
import style from './index.module.scss';
import { useRouter } from 'next/router'
import Image from 'next/image';
import fetchOneBooks from '@/lib/fetch-one-books';
import {GetStaticPropsContext, InferGetStaticPropsType } from 'next';


export const getStaticPaths = () => {
  return {
    paths: [
      {params: {id: "2"}},
      {params: {id: "1"}},
      {params: {id: "3"}}, //빌드 시 사전에 동적 경로를 미리 생성해둠. 사전에 만들어 놓지 않은 url 파라미터로 접근하면 찾을 수 없다고 나옴. 자동으로 404로 이동시켜버림.
    ],
   // fallback: false, //NOT FOUND 페이지로 제공
    //fallback: "blocking", //새로 요청온 페이지를 ssr처럼 만들어 낸다. 페이지 생성이 오래 걸리게 되면 로딩이 실행됨. 아무것도 하지 않기 때문에
    fallback: true //getStaticProps부터 받은 데이터가 없는 UI를 먼저 만들고(사전렌더링으로), 그리고 props 반환해서 데이터 넣음
  }
}
export const getStaticProps = async (context :GetStaticPropsContext) => {
   // console.log(context)
    const id = context.params!.id; //'!' null이나 undefined가 아님을 확신할 때 사용
    const detailBook = await fetchOneBooks(Number(id));
    if(!detailBook) {
      return {
        notFound: true,
      }
    }
    return {
        props: {
            detailBook
        }
    }

   // getStaticProps에서는 반환값으로 { props: … } 외에도 { notFound: true } 또는 { redirect: … } 을 사용할 수 있다.
}

//getStaticProps 여기서 제공하는 context 객체 목록
// params?: P;            // [id] 같은 동적 경로 파라미터
//   preview: boolean;      // 미리보기 모드
//   previewData?: unknown; // 미리보기 데이터
//   locale?: string;       // i18n 로케일
//   locales?: string[];    // 지원 로케일 목록
//   defaultLocale?: string;// 기본 로케일

export default function Page({detailBook}:InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  // console.log(router); //console에 찍었을때 query 라는 키 안에 []에 넣은 문자열이(id) 키값으로 url 파라미터로 받은 값이 value 값으로 저장됨.

  // const { id } = router.params;
  if(router.isFallback) return <div>로딩중</div>//진짜 문제가 발생한건지 아니면 getStaticProps에서 ui를 먼저 그리고 props를 받아오는 상태인지 구분하기 위함임.
  if(!detailBook) return <div>책 정보가 없습니다.</div>; //책 정보가 없을 때 처리
  const { coverImgUrl, title, subTitle, author, publisher, description } = detailBook;//구조분해할당
  return (
    <div className={style.Detail}>
      <div
        className={style.imgDetail}
        style={{ backgroundImage: `url(${coverImgUrl})` }}
      >
        <Image src={coverImgUrl} alt={title} width={240} height={280} />
      </div>
      <div className={style.content}>
        <h2 className={style.title}>{title}</h2>
        <p className={style.subTitle}>{subTitle}</p>
        <p className={style.authorNpublisher}>
          <span className={style.author}>{author}</span>
          <span className={style.publisher}>{publisher}</span>
        </p>
        <p className={style.description}>{description}</p>
      </div>
    </div>
  );
}
