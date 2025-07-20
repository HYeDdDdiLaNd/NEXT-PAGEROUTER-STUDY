import style from './Header.module.scss';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={style.header}>
      <h1>
        <Link href={'/'}>🥱📚 ONEBITE BOOKS</Link>
      </h1>
    </header>
  );
};

export default Header;
