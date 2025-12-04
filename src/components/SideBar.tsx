//新規投稿作成のためのサイドバー表示用ファイル

import { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider";
import { PostListContext, PostType } from "../providers/PostListProvider";
import { post, getList } from "../api/Post";

export default function SideBar() {
  const [msg, setMsg] = useState(""); //message部分を管理
  const { userInfo } = useContext(UserContext);
  const { setPostList } = useContext(PostListContext);

  const getPostList = async () => { //リスト更新(PostListのやつと一緒)
    const posts = await getList(userInfo.token);

    console.log(posts);

    if (!posts) return; //何も書いてなかったら何もしない

    const newPostList: Array<PostType> = posts.map((p: any) => ({
      id: parseInt(p.id),
      user_name: p.content,
      content: p.content,
      created_at: new Date(p.created_at),
    }));
    
    setPostList(newPostList);
  };

  const onSendClick = async () => {
    if (!msg.trim()) return; //空文字ははじく

    await post(String(userInfo.id), userInfo.token, msg);
    //idとtokenとメッセージをpostのapiに送る

    await getPostList(); //投稿が終わったら最新のリストの取得

    setMsg(""); //送信後は空文字に。
  };

  return (
    <SSideBar>
      <SSideBarRow>{userInfo.user_name}</SSideBarRow>
      <SSideBarRow>{userInfo.email}</SSideBarRow>

      <SSideBarRow>
        <SSideBarTextArea
          rows={4}
          value={msg}
          onChange={(evt) => setMsg(evt.target.value)}
          //入力のたびにmsgを更新
        />
      </SSideBarRow>

      <SSideBarRow>
        <SSideBarButton onClick={onSendClick} disabled={!msg}>送信</SSideBarButton>
        {/* 入力されていないときは送信できないようにしてる */}
      </SSideBarRow>
    </SSideBar>
  );
}

//以下略)
const SSideBar = styled.div`
  padding: 8px;
`;

const SSideBarRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`;

const SSideBarTextArea = styled.textarea`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #cccccc;
`;

const SSideBarButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #fafafa;
  width: 100%;
`;
