//key of 연산자

interface Person {
  name: string;
  age: number;
}

function personFunc(person: Person, key: keyof Person) {
  //key: 'name' | 'age' 프로퍼티의 키 값만 가져온다.
  //그 이유는 keyof Person을 하지 않고 'name'이런식으로 타입을 정해버리면 함수 호출 시 'name' 이외의 키가 들어오거나 추가되는 경우 비효율 적이기 때문에
  console.log(`${person[key]}`);
}

const person = {
  name: '정혜진',
  age: 12,
};

personFunc(person, 'age');

//type of 연산자 : 자바스크립트의 type of 연산자는 타입스크립트에서 타입과 함께 쓰면 동작하는 방식이 달라진다.
type Peson2 = typeof person; //person 변수에 할당된 값들을 가지고 타입을 자동으로 추론한다.

function personFunc2(person: Peson2, key: keyof typeof person) {
  //key: 'name' | 'age' 프로퍼티의 키 값만 가져온다.
  console.log(`${person[key]}`);
}

personFunc2(person, 'age');
