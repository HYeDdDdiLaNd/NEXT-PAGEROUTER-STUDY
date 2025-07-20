import { useRouter } from 'next/router';
import style from './Global-input.module.scss';
import { useEffect, useState } from 'react';

const GlobalInput = () => {
  const router = useRouter();
  const q = router.query.q as string; //router.query 에는 next에서 기본적으로 정의해 놓은 타입이 있음.
  const [input, setInput] = useState('');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClickSubmit = () => {
    if (!input) return;
    router.push(`/search?q=${input}`);
  };

  useEffect(() => {
    setInput(q || '');
  }, [q]); //새로고침 시 인풋 리셋 방지

  return (
    <div className={style.searchInput}>
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        value={input}
        onChange={onChangeInput}
      />
      <button type="button" onClick={onClickSubmit}>
        검색하기
      </button>
    </div>
  );
};

export default GlobalInput;
