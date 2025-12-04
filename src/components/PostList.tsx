//Postコンポーネントの要素をずらーっと並べる役割

import { useContext, useEffect } from "react";
import styled from "styled-components";
import Post from "./Post";
import { PostListContext, PostType } from "../providers/PostListProvider";
import { UserContext } from "../providers/UserProvider";
import { getList } from "../api/Post";

export default function PostList() { //どこからでもアクセスできる箱からデータをとる
  const { postList, setPostList } = useContext(PostListContext); //現在の投稿リスト
  const { userInfo } = useContext(UserContext); //ユーザー情報

  const getPostList = async () => {
    console.log("MainLayout: getPostList");

    const posts = await getList(userInfo.token); //apiでサーバーからデータ取得

    console.log(posts);

    let postList: Array<PostType> = [];

    if (posts) {
      posts.forEach((p: any) => {
    //余談:forEachは戻り値がないから自分で空配列を作ってpushしないといけないけどmapは勝手に配列作って入れてくれる。
    //     新しい配列が必要かどうかで使い分ける(メモリの問題だから今はまだ考えられなくても…)
        postList.push({
          id: p.id,
          user_name: p.user_name,
          content: p.content,
          created_at: new Date(p.created_at), //またまた日付データ変換
        });
      });
    }

    setPostList(postList); //取り出してきた箱に戻す(Post側がDate型を期待してるから。)
  };

  useEffect(() => { //開いたときに1回だけ実行して一覧を取得
    getPostList();
  }, []);

  return ( //中身を１個づつ取り出して画面に出力
    <SPostList>
      {postList.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </SPostList>
  );
}

//以下スタイル変更
const SPostList = styled.div`
  margin-top: 16px;
  height: 100%;
  overflow-y: scroll;
`;
