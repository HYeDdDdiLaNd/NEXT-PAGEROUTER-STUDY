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

import type { BookItem } from '@/util/types';
import style from './index.module.scss';

const mockData = {
  id: 7,
  title: '이펙티브 타입스크립트',
  subTitle: '동작 원리의 이해와 구체적인 조언 62가지',
  description:
    '타입스크립트는 타입 정보를 지닌 자바스크립트의 상위 집합으로, 자바스크립트의 골치 아픈 문제점들을 해결해 준다. 이 책은 《이펙티브 C++》와 《이펙티브 자바》의 형식을 차용해 타입스크립트의 동작 원리, 해야 할 것과 하지 말아야 할 것에 대한 구체적인 조언을 62가지 항목으로 나누어 담았다.\n각 항목의 조언을 실제로 적용한 예제를 통해 연습하다 보면 타입스크립트를 효율적으로 사용하는 방법을 익힐 수 있다. 타입스크립트를 기초적인 수준에서만 활용했다면 이 책을 통해 타입스크립트 전문가로 거듭나 보자.\n\n이 책에서 다루는 내용\nㆍ 타입스크립트의 타입 시스템에 대한 자세한 이해\nㆍ 안전하고 명료한 코드를 작성할 수 있는 타입 설계\nㆍ 최소한의 타입 구문으로 완전한 안전성을 얻을 수 있는 타입 추론\nㆍ any 타입의 전략적 사용\nㆍ 의존성과 타입 선언 파일이 동작하는 원리\nㆍ 자바스크립트를 타입스크립트로 마이그레이션하는 방법',
  author: '댄 밴더캄',
  publisher: '인사이트',
  coverImgUrl:
    'https://shopping-phinf.pstatic.net/main_3247334/32473346832.20221227204218.jpg',
};

export default function Page({}: BookItem) {
  // const router = useRouter();
  // console.log(router); //console에 찍었을때 query 라는 키 안에 []에 넣은 문자열이 키값으로 url 파라미터로 받은 값이 value 값으로 저장됨.

  // const { id } = router.query;
  return (
    <div className={style.Detail}>
      <div
        className={style.imgDetail}
        style={{ backgroundImage: `url(${mockData.coverImgUrl})` }}
      >
        <img src={mockData.coverImgUrl} alt="" />
        {/* <Image src={coverImgUrl} alt={mockData.title} width={240} height={280} /> */}
      </div>
      <div className={style.content}>
        <h2 className={style.title}>{mockData.title}</h2>
        <p className={style.subTitle}>{mockData.subTitle}</p>
        <p className={style.authorNpublisher}>
          <span className={style.author}>{mockData.author}</span>
          <span className={style.publisher}>{mockData.publisher}</span>
        </p>
        <p className={style.description}>{mockData.description}</p>
      </div>
    </div>
  );
}
