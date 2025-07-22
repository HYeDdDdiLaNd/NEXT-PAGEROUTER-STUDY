//인덱스드 엑세스 타입

//1. 인터페이스에서의 타입 추출
// interface Post {
//   name: string;
//   age: number;
//   author: {
//     id: number;
//     nickname: string;
//   };
//   content: string;
// }

// function printPostAuthor(author: Post['author']) {
//   console.log(`${author.id} ${author.nickname}`);
// }

//2. 배열요소의 타입 추출
type PostList = {
  name: string;
  age: number;
  author: {
    id: number;
    nickname: string;
  };
  content: string;
}[];

function printPostAuthor(author: PostList[number]['author']): void {
  //일단 배열이기 때문에 배열 요소 타입을 먼저 뽑아오고 그 다음에 배열 안에서 객체를 뽑아온다.
  console.log(`${author.id} ${author.nickname}`);
}

const post: PostList[number] = {
  name: '정혜진',
  age: 1,
  author: {
    id: 1,
    nickname: '혜뒤',
  },
  content: '안녕방구',
};

type Tup = [number, string, boolean];

type Tup0 = Tup[0];
type Tup1 = Tup[1];
type Tup2 = Tup[2];
type Tup3 = Tup[number]; //공통된 최적의 타입으로 뽑기 때문에 유니언 타입으로 뽑아온다.
