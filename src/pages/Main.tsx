//メイン画面表示用のコンポーネント&認証チェック

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { PostListProvider } from "../providers/PostListProvider";
import { UserContext } from "../providers/UserProvider";

export default function Main() {
  const { userInfo } = useContext(UserContext); //ログインのチェック
  const loggedIn = userInfo.token !== "";
  //tokenあり(!==)ログイン済み、tokenなし(===)未ログイン
  console.log(loggedIn);

  return (
    <PostListProvider>
      {/* データをuseContextで使えるように共有 */}
      {loggedIn ? <MainLayout /> : <Navigate replace to="/" />}
      {/* tokenの認証がtrueだったらメイン画面へ。 falseならサインイン画面へ。
        replaceがついているので戻るボタンを押しても戻れなくなる */}
    </PostListProvider>
  );
}
