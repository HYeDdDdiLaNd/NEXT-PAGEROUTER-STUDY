// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try{
    await res.revalidate('/'); //재 생성할 페이지의 경로를 지정
    return res.json({revalidate: true}); //성공적으로 재생성되었음을 응답
  } catch (error) {
    res.status(500).send("Revalidation failed");
    new Error(`Revalidation failed: ${error}`); //에러 발생 시 에러 메시지 출력
  }
}

//revalidate 요청을 처리할 새로운 api 라우터생성
//on-demand: 일정 시간마다가 아닌 사용자에게 요청을 받을 때마다 isr 페이지를 다시 생성한다.
//최신데이터를 반영하면서 정적페이지로서 처리할 수 있다.
//요청을 기반으로