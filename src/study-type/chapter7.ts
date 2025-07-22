//Partial에 대해 배우고 직접 이 타입 구현해본다.
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

const draft: Partial<Post> = {
  title: 'ww[fd',
  content: 'ddd',
};

const draft2: A<Post> = {
  title: 'ww[fd',
  content: 'ddd',
};

type A<T> = { [key in keyof T]?: T[key] };

type A1 = A<Post>;
type A2 = Partial<Post>;

//Required에 대해 배우고 직접 이 타입 구현해본다.

const withThumbnailPost: Required<Post> = {
  title: 'sda',
  tags: ['ds'],
  content: 'string',
  thumbnailURL: 'string',
};

type B<T> = { [key in keyof T]-?: T[key] }; // 마이너스를 붙이면 ?를 뺄 수 있음.

type B1 = Required<Post>;
type B2 = B<Post>;

//Readonly 대해 배우고 직접 이 타입 구현해본다.
const readonlyPost: Readonly<Post> = {
  title: 'sda',
  tags: ['ds'],
  content: 'string',
};

type C<T> = { readonly [key in keyof T]: T[key] };

type C1 = Readonly<Post>;
type C2 = C<Post>;
