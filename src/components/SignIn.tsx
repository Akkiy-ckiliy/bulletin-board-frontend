//ユーザーのログイン処理ファイル

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider";
import { sign_in } from "../api/Auth";

export default function SignIn() {
  const navigate = useNavigate(); //画面遷移のための処理
  const [userId, setUserId] = useState(""); //IDの管理
  const [pass, setPass] = useState(""); //passの管理
  const { userInfo, setUserInfo } = useContext(UserContext);
  //ユーザー情報はグローバルな箱に投入(共有)

  const onSignInClick = async (e: React.FormEvent) => { //signin(idとpassを認証)
    e.preventDefault(); //リロード阻止コード
    //これがないと、送信時にページが再読み込みされて全部リセットされちゃう
    const ret = await sign_in(userId, pass);

    // console.log(ret); 開発中はいいけど本番環境は危ないから消す。

    if (ret && ret.token) {
      //認証結果retとtokenがあればok
      console.log(`Sign in success. ${ret.user_id}, ${ret.token}`);

      setUserInfo({
        //ユーザー情報(idとtoken)を共有
        id: parseInt(ret.user_id),
        token: ret.token,
      });

      // ★追加 2. ローカルストレージにも保存（リロード対策）★
      localStorage.setItem("auth_token", ret.token);
      localStorage.setItem("user_id", ret.user_id);
      // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

      navigate("/main"); //メイン画面に移動
    } else {
      alert("ログインに失敗しました。IDかパスワードが違います。");
      //ログイン失敗時のメッセージ出力
    }
  };

  return (
    <SSignInFrame>
      <form>
      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="id">ID</label>
        </SSignInLabel>

        <SSignInInput>
          <input
            id="id"
            value={userId}
            type="text"
            onChange={(evt) => setUserId(evt.target.value)}
          />
        </SSignInInput>
      </SSignInRow>

      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="password">Password</label>
        </SSignInLabel>

        <SSignInInput>
          <input
            id="password"
            value={pass}
            type="password"
            onChange={(evt) => setPass(evt.target.value)}
            //type=passwordって設定すると打った文字を●にできる
          />
        </SSignInInput>
      </SSignInRow>

      <SSignInRow>
        <SLoginButton type="submit" onClick={onSignInClick}>
          Login
        </SLoginButton>
      </SSignInRow>
      </form>
    {/* 全体をformで囲ってbuttonのtypeをsubmitにするとボタンを押さなくてもEnterで出せるようになるらしい */}
    </SSignInFrame>
  );
}

//以下略)
const SSignInFrame = styled.div`
  background-color: #f8f8f8;
  margin: 80px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;
`;

const SSignInRow = styled.div`
  display: inline-block;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SSignInLabel = styled.span`
  display: inline-block;
  width: 25%;
  vertical-align: top;
  text-align: right;
  margin-right: 4px;
`;

const SSignInInput = styled.span`
  display: inline-block;
  width: auto;
  vertical-align: top;
  margin-left: 4px;
`;

const SLoginButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
`;
