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
import Image from 'next/image';
import fetchOneBooks from '@/lib/fetch-one-books';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = async (context : GetServerSidePropsContext) => {
   // console.log(context)
    const id = context.params!.id;
    const detailBook = await fetchOneBooks(Number(id));
    return {
        props: {
            detailBook
        }
    }
}

export default function Page({detailBook}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const router = useRouter();
  // console.log(router); //console에 찍었을때 query 라는 키 안에 []에 넣은 문자열이(id) 키값으로 url 파라미터로 받은 값이 value 값으로 저장됨.

  // const { id } = router.params;
  
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
