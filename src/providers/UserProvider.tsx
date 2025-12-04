//ユーザー情報を持ち歩く管理者の定義ふぁいる

import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
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

  return (
    //データの配布コード
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
    // SignIn.tsx, Main.tsx, SideBar.tsxがこれを使って処理する
  );
};
