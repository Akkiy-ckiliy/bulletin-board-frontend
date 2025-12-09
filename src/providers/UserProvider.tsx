//ユーザー情報を持ち歩く管理者の定義ふぁいる

import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";
import React from "react"; //全ファイルそうだけどこれは最近はなくても大丈夫みたい

type UserInfo = {
  id: number;
  token: string;
  user_name?: string;
  email?: string;
};

export const UserContext = createContext(
  //PostListProviderと同じ共有通路
  {} as {
    userInfo: UserInfo;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
  }
);

type Props = {
  children: ReactNode;
  //ReactNodeはReactが画面に描画できるものすべての総称(HTMLタグ・文字列・数とか)
};

export const UserProvider = (props: Props) => {
  const { children } = props;
  const [userInfo, setUserInfo] = useState<UserInfo>({ id: 0, token: "" });
  //これが本物のデータ(初期値は0,空文字)

  // ★★★ 追加部分ここから ★★★
  // 画面がリロードされたら1回だけ動く処理
  useEffect(() => {
    // ローカルストレージから保存しておいたデータを取り出す
    const savedToken = localStorage.getItem("auth_token");
    const savedId = localStorage.getItem("user_id");

    // もしデータが残っていたら、それをセットして「ログイン状態」を復元する
    if (savedToken && savedId) {
      setUserInfo({
        id: parseInt(savedId), // 文字列を数字に変換
        token: savedToken,
      });
      console.log("🔄 ログイン状態を復元しました！");
    }
  }, []); // [] なので最初の1回だけ実行される
  // ★★★ 追加部分ここまで ★★★

  return (
    //データの配布コード
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
    // SignIn.tsx, Main.tsx, SideBar.tsxがこれを使って処理する
  );
};
