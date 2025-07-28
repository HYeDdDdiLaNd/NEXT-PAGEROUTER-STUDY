
import type {BookItem} from '@/util/types';
export default async function fetchBooks(q?: string): Promise<BookItem[]> {
    //'?' : 선택적 프로퍼티
    let url = `http://localhost:12345/book`;

    if(q) {
        url += `/search?q=${q}`; //어떤 값을 줘야 보내주지..
    } 

    try {
        const response = await fetch(url); //데이터 가져오는거 기다리기.
        // 만약에 서버에서 에러가 발생했다면, response.ok는 false가 된다.
        // 따라서 에러를 처리할 수 있다.
        if(!response.ok) {
            throw new Error('네트워크 응답이 실패했습니다.'); //에러를 던진다.
        }
        return await response.json(); //json으로 변환하는거 기다리고 반환하기.
        
    } catch (error) {
        console.log(error)
        return []; //에러가 발생하면 빈 배열을 반환한다.
    }
}