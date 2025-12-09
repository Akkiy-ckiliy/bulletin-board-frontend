import axios from "axios";
import { API_BASE_URL } from "../config";

export type PostResponse = {
  //型定義(管理番号・名前・メッセージ・日時を管理)
  id: string;
  user_name: string;
  content: string;
  created_at: string;
};

const post = async (
  //新規投稿
  user_id: string,
  token: string,
  msg: string
  //いつも通り各値を取得
): Promise<void> => {
  const data = {
    //メッセージを箱に投入
    message: msg,
  };
  //あとは他と一緒(宛先＆送信)
  const url = `${API_BASE_URL}/post?user_id=${user_id}&token=${token}`;

  const res = await axios.post(url, data);

  console.log(res);
};

// const getList = async (token: string): Promise<PostResponse[]> => { //タイムライン表示のための読み込みをする関数
//   const url = `http://localhost:3001/post?token=${token}&records=10`;
//   //url作成(tokenでログイン確認＆recordsで数指定)

//   const res = await axios.get<PostResponse[]>(url);
//   //取得(今回は複数なのでジェネリックは配列。)

//   return res.data; //中身だけ返却
// };

//セキュリティの問題 part2
const getList = async (token: string): Promise<PostResponse[]> => {
  const url = `${API_BASE_URL}/post?records=10`; // URLからトークンを削除しておくと安心

  const res = await axios.get<PostResponse[]>(url, {
    headers: { //Authorizationっていう名前のヘッダーを登録(ヘッダーは機密性が高いらしい)
      Authorization: `Bearer ${token}`,
      //Bearerはその文字列を持っている人が使用権を与えられるという意味でよく使われるんだって。
    },
  });

  return res.data;
};

export { post, getList }; //複数exportするときはこんな書き方もできる
