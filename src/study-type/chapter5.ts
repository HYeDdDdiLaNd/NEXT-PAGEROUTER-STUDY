interface User {
  id: number;
  name: string;
  login: boolean;
}

//맵드 연산자 in
type PatialUserType = { [key in 'id' | 'name' | 'login']?: User[key] };
type PatialUserType2 = { [key in keyof User]?: User[key] }; // keyof 는 key값만 유니언 타입으로 모아주는 것,  User[key] 인덱스드 엑세스 타입
type TransformUserType = { [key in keyof User]: boolean };
type TransformUserType2 = { [key in keyof User]?: boolean };
type ReadonlyType = { readonly [key in keyof User]: boolean };

function getUserInfo(): PatialUserType2 {
  return {
    id: 1,
    name: 'sdfds',
    login: false,
  };
}

const fetUser = getUserInfo();

function setUserInfo(user: PatialUserType) {
  //dffd...
}

setUserInfo({
  id: 1,
  name: 'sdfds',
  login: true,
});
