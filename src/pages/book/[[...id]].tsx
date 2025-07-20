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

import { useRouter } from 'next/router';
export default function Page() {
  const router = useRouter();
  console.log(router); //console에 찍었을때 query 라는 키 안에 []에 넣은 문자열이 키값으로 url 파라미터로 받은 값이 value 값으로 저장됨.

  const { id } = router.query;
  return (
    <>
      <h4>{id} book</h4>
    </>
  );
}
