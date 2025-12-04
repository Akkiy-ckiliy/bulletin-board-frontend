import PostList from "./PostList"; //別ファイルのコンポーネント読み込み

export default function Contents() { //コンポーネントを新しく作成
  return <PostList></PostList>; 
  //画面の表示内容(PostListを直で出力すると項目の変更の時に大変らしいのでcontentsにいれる)
}
