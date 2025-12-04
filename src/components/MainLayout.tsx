import { useContext, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import SideBar from "./SideBar";
import Contents from "./Contents";
import { UserContext } from "../providers/UserProvider";
import { PostListContext, PostType } from "../providers/PostListProvider";
import { getList } from "../api/Post";

export default function MainLayout() {
  const { userInfo } = useContext(UserContext); //ユーザー情報のid,tokenなどが入ってるglobalな箱

  const { setPostList } = useContext(PostListContext); //投稿一覧のデータが入ったglobalな箱
  //useContextを使うとなんかglobalになるみたい(詳しいルールとかはまだよくわかってない。)

  const getPostList = async () => {
    //APIがバックにぶん投げてくれたから返ってきたデータを取得
    console.log("MainLayout: getPostList");

    const posts = await getList(userInfo.token);

    console.log(posts);

    let postList: Array<PostType> = [];

    if (posts) {
      posts.forEach((p: any) => {
        //ここで日付データの変換を行う
        postList.push({
          id: p.id,
          user_name: p.user_name,
          content: p.content,
          created_at: new Date(p.created_at), //文字列からData型(jsで使えるDataオブジェクト)に変換
        });
      });
    }

    setPostList(postList); //グローバル変数(Context)に保存
  };

  useEffect(() => {
    // トークンがある時だけ取得しに行く
    if (userInfo.token) {
      getPostList();
    }
  }, [userInfo.token]);

  return ( //画面表示内容
    <>
      <SHeader>
        <Header></Header>
      </SHeader>

      <SBody>
        <SSideBar>
          <SideBar></SideBar>
        </SSideBar>

        <SContents>
          <Contents></Contents>
        </SContents>
      </SBody>
    </>
  );
}

//以下デコレーション

const SHeader = styled.div`
  width: 100%;

  height: 32px;

  box-shadow: 0px 4px 4px #aaaaaa;
`;

const SBody = styled.div`
  width: 100%;

  height: calc(100vh - 32px);

  display: flex;

  flex-direction: row;
`;

const SSideBar = styled.div`
  border-right: 1px solid #222222;

  width: 30%;

  height: 100%;
`;

const SContents = styled.div`
  flex: 1;

  height: 100%;
`;
