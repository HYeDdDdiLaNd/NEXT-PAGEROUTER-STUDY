import { useRouter } from 'next/router';
import style from './Global-input.module.scss';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

const GlobalInput = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
console.log(router)
  const q = router.query.q as string; //router.query 에는 next에서 기본적으로 정의해 놓은 타입이 있음.
  const [input, setInput] = useState('');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClickSubmit = () => {
    if (!input || input === q) return; //빈 값이거나 같은 값을 검색했을 경우
    router.push(`/search?q=${input}`); //push 페이지를 이동시킴.
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      onClickSubmit();
    }
  };

  useEffect(() => {
    setInput(q || '');
  }, [q]); //새로고침 시 인풋 리셋 방지

  return (
    <div>
      <div className={style.searchInput}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={input}
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
        />
        <button type="button" onClick={onClickSubmit}>
          검색하기
        </button>
      </div>
      {children}
    </div>
  );
};

export default GlobalInput;
