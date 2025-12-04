//アプリ上部のヘッダーの表示

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { getUser } from "../api/User";

export default function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);

  const logout = () => {
    //ログアウト処理
    setUserInfo({ id: 0, token: "" });
    navigate("/"); //サインイン画面に強制遷移
  };

  useEffect(() => {
    //ユーザー情報をサーバーからとってくる
    if (!userInfo.token) return;

    const myGetUser = async () => {
      try {
        const user = await getUser(userInfo.id, userInfo.token);

        setUserName(user.name);
      } catch (e) {
        //エラー時処理
        console.error("ユーザー取得失敗", e);
      }
    };
    myGetUser();
  }, [userInfo.id, userInfo.token]);

  return (
    <div>
      <span>MicroPost</span>
      <span>{userName} さん</span>
      <span onClick={logout}>ログアウト</span>
    </div>
  );
}
