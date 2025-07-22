//Pick<T, K>에 대해 알아본다.
//: 객체 타입으로부터 특정 프로퍼티만 딱 골라내는 그런 타입
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

const legacyPost: Pick<Post, 'title' | 'content'> = {
  title: '옛날거',
  content: '옛날 글',
};

type D<T, K extends keyof T> = { [key in K]: T[key] }; //K에 함수, 객체, 네버 타입도 들어올 수 있기 때문에 K에는 T의 key들만 들어올 수 있도록 제한한다.
type D1 = Pick<Post, 'title' | 'content'>;
type D2 = D<Post, 'title' | 'content'>;

//Omit<T,K>: 생략하다.
//객체타입으로부터 특정 프로퍼티를 제거하는 타입

type E<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
//풀어헤쳐보자면,
/**
 * T: Post, K: 'tags'
 * Pick<Post, Exclude<'title' | 'tags' | 'content' | 'thumbnailURL', 'tags'>> Exclude는 특정 타입만 제거함. type Exclude<T, U> = T extends U ? never : T;
 * Pick<Post, 'title' | 'content' | 'thumbnailURL'> 여기서 pick은 특정 타입만 뽑아옴.
 * 결과로는
 *
 * title: string;
 * content: string;
 * thumbnailURL?: string;
 *
 * 이렇게 남는다.
 */

type E1 = E<Post, 'tags'>;

/**
 * Record<K, V>
 * 동일한 패턴의 갹체 타입을 쉽개 정의할 수 있다.
 */

type thumbnailImg = Record<
  'large' | 'medium' | 'small',
  { url: number; src: string }
>;
type R<K extends keyof any, V> = { [key in K]: V }; //어떤 객체의 키 타입이야 K extends keyof any
type R1 = any;
type R2 = any;
