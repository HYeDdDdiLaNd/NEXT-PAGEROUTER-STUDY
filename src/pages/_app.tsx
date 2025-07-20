import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickBtnByMoveTestPage = () => {
    router.push('/test');
  };

  const onClickBtnByMoveBack = () => {
    router.back();
  };

  const onClickBtnDontBack1 = () => {
    /* 쿼리스트링으로 이동 */
    router.replace({
      pathname: '/search',
      query: { q: 'apple' },
    });
  };

  const onClickBtnDontBack2 = () => {
    /* url 파라미터로 이동 */
    router.replace('/book/[[...id]]', '/book/123');
  };

  return (
    <>
      <nav>
        <Link href={'/'}>index</Link>&nbsp;
        {/* next에서 제공되는 Link를 사용한다. 렌더링 방식의 링크 생성 */}
        <Link href={'/search'}>search</Link>&nbsp;
        <Link href={'/book/1'}>book/1</Link>&nbsp;
        {/* 프로그래메틱 하게 페이지 이동: 사용자가 링크를 클릭해서 이동이 아닌 이벤트에 의해 함수가 실행되어 페이지가 이동되는 것을 말함. */}
        <button onClick={onClickBtnByMoveTestPage}>테스트 페이지로 이동</button>
        <button onClick={onClickBtnByMoveBack}>뒤로가기</button>
        <button onClick={onClickBtnDontBack1}>
          뒤로가기 방지: 쿼리 스트링
        </button>
        <button onClick={onClickBtnDontBack2}>
          뒤로가기 방지: url 파라미터
        </button>
      </nav>

      <Component {...pageProps} />
    </>
  );
}
