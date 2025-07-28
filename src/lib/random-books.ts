
import type {BookItem} from '@/util/types';
export default async function fetchRandomBooks():Promise<BookItem[]> {
    const url = `http://localhost:12345/book/random`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error();
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}