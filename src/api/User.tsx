import axios from "axios"; //ここはHTTPリクエストをやりやすくするところね。

// const getUser = async (user_id: number, token: string) => {
//   const url = `http://localhost:3001/user/${user_id}?token=${token}`;
//   //単純にidとtoken取得してurlにくっつけて宛先作成して送信してるだけ

//   const res = await axios.get(url);

//   return res.data; //ここで結果返す(画面のコンポーネントとかに)
// };

const getUser = async (user_id: number, token: string) => {
  // トークンをURLから除外
  const url = `http://localhost:3001/user/${user_id}`; 

  const res = await axios.get(url, {
    // ヘッダーにトークンを入れる(postと一緒)
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export { getUser };
