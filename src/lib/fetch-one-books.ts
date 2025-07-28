
import type {BookItem} from '@/util/types';
export default async function fetchBooks(id: number): Promise<BookItem | null> {
    //하나의 데이터만 반환한다.
    const url = `http://localhost:12345/book/${id}`;
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
        return null;
    }
}