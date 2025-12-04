//ここのapiファイルに入ってる3つはバック側に処理をぶん投げてくれるふぁいる。

import axios from "axios"; //HTTPメソッドでのやり取りを快適にするためのやつ。
import { API_BASE_URL } from "../config";

export type SignInResponse = { //型定義(レスポンスの型をあらかじめ決めておく)
  user_id: string;
  token: string;
};

// export const sign_in = async ( //ログインを実行する本体コード
//   user_id: string,
//   pass: string
//   //idとpassを受け取る
// ): Promise<SignInResponse> => {
//   //Promiseでさっきの型の形で必ず返すよって約束
//   const url = `http://localhost:3001/auth?user_id=${user_id}&pass=${pass}`;
//   //url(宛先)の作成

//   console.log(url); //一応確認できるように出力

//   const res = await axios.get<SignInResponse>(url);
//   //サーバーにデータ頂戴ってリクエスト出す(HTTPメソッドのGETで。)
//   //<>は返ってくる型の設定 時間かかるのでawait(親要素にasync)

//   console.log(res);
//   return res.data; //結果を返却(ログイン画面のコンポーネントとかに。)
// };

// 上のやり方だとurlに直接パスワードをくっつけててセキュリティ的に危ないので下のやり方のほうが安全。
export const sign_in = async (user_id: string, pass: string): Promise<SignInResponse> => {
  const url = `${API_BASE_URL}/auth`; //ベースのurlをつくって

  const res = await axios.post<SignInResponse>(url, { user_id, pass }); //idとpassはベースurlと分けてバック側に送る
  return res.data;
};