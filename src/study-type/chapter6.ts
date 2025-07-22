//분산적인 조건부 타입
//never는 공집합이기 때문에 never와 어떤 타입이 만나면 그 타입만 남는다.
//string만 빼내기
//특정 타입만 제거하는 타입
type Exclude<T, U> = T extends U ? never : T;
type A = Exclude<number | string | boolean, string>;

//string만 남기기
type Extract<T, U> = T extends U ? T : never;
type B = Extract<number | string | boolean, string>;

type StringNumberSwitch2<T> = [T] extends [number] ? string : number;
// [boolean | number | string] extends [number] ? string : number
let d: StringNumberSwitch2<boolean | number | string>;

//조건부 타입 내에서 타입 추론하기 (특정 위치의 타입을 추론)
//infer R을 사용하면 참으로 추론될 수 있게 한다.
type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;
type PromiseA = PromiseUnpack<Promise<number>>; //number가 추론되야함.

//ReturnType<T>
//함수의 반환값 타입을 추출하는 타입
function funcA() {
  return 'hello';
}

function funcB() {
  return 342;
}

type ReturnTypeA = ReturnType<typeof funcA>;
type ReturnTypeB = ReturnType<typeof funcB>;
