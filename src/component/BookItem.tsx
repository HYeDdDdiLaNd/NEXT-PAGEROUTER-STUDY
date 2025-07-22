import style from './BookItem.module.scss';
import Image from 'next/image';
import type { BookItem } from '@/util/types';
import Link from 'next/link';

type Props = Omit<BookItem, 'description'> & {
  description?: string;
};

const BookItem = ({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: Props) => {
  return (
    <li className={style.liWrap}>
      <Link href={`/book/${id}`}>
        <div className={style.imgBox}>
          <Image src={coverImgUrl} alt={title} width={140} height={180} />
        </div>
        <div className={style.content}>
          <h3 className={style.title}>{title}</h3>
          <p className={style.subTitle}>{subTitle}</p>
          <p className={style.authorNpublisher}>
            <span className={style.author}>{author}</span>
            <span className={style.publisher}>{publisher}</span>
          </p>
        </div>
      </Link>
    </li>
  );
};

export default BookItem;
