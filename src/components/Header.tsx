import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { getUser } from "../api/User";
import styled from "styled-components";

export default function Header() {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useContext(UserContext);
  //アプリ全体で共有されてるユーザー情報箱(idとtoken)にアクセス(誰が使っているかの確認)

  const [userName, setUserName] = useState("");
  //APIからとってきたユーザーの名前を保持して画面に表示

  useEffect(() => {
    //画面が表示 or ログイン情報が変わった瞬間に自動的に1回だけ動く処理
    const fetchUserName = async () => {
      if (userInfo.id && userInfo.token) {
        const user = await getUser(userInfo.id, userInfo.token);
        setUserName(user.name);
      }
      //idとtokenが合えば(認証できたら)getUserを実行して名前をセット
    };
    fetchUserName(); //再読み込み
  }, [userInfo.id, userInfo.token]);

  const logout = () => {
    //ログアウト処理(ログアウトすると)～～
    setUserInfo({ id: 0, token: "" }); //～～ユーザー情報が空になり～～

    navigate("/"); //～～強制的にログイン画面へ。
  };

  return (
    //表示内容
    <SHeader>
      <SLogo>MicroPost</SLogo>

      <SRightItem>
        <SName>{userName} さん</SName>

        <SLogout onClick={logout}>ログアウト</SLogout>
      </SRightItem>
    </SHeader>
  );
}

//ここから下は見た目のデコレーション
const SHeader = styled.div`
  background-color: #222222;

  display: flex;

  flex-direction: row;

  color: #f8f8f8;

  padding-left: 8px;

  padding-right: 8px;

  height: 100%;
`;

const SLogo = styled.div`
  padding-top: 8px;

  padding-bottom: 8px;

  text-align: center;

  justify-content: start;
`;

const SRightItem = styled.div`
  width: 100%;

  display: flex;

  flex-direction: row;

  justify-content: end;
`;

const SName = styled.div`
  padding-top: 8px;

  padding-bottom: 8px;

  text-align: center;

  margin-right: 8px;
`;

const SLogout = styled.div`
  padding-top: 8px;

  padding-bottom: 8px;

  text-align: center;
`;
