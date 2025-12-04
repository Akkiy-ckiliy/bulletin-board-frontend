//投稿データをアプリファイル全体で共有するための配送システムふぁいる

import React, {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  ReactNode,
} from "react";

export type PostType = {
  //投稿データがどんな形をしているかの設計図
  id: number;
  user_name: string;
  content: string;
  created_at: Date;
};

export const PostListContext = createContext(
  //データの通り道を作る関数
  {} as { //asって打つと型チェックを黙らせられる。 なので結構危ないしtsの意味なくなる
    //今回の場合初期値で空objを渡すと怒られるからasで黙らせてるらしい
    postList: PostType[]; //データ本体
    setPostList: Dispatch<SetStateAction<PostType[]>>; //ここでデータを書き換え
  }
);

export const PostListProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const [postList, setPostList] = useState<PostType[]>([]);
  //これが本物のデータ(上で空objを渡してたとこに追加で入っていくデータたち)

  return (
    //valueでデータをセットして子要素を囲んでMainLayoutに配送する
    //余談:MainLayoutはcomponentたちの親なのでMainLayoutに送れば他へも配れる
    <PostListContext.Provider value={{ postList, setPostList }}>
      {children}
    </PostListContext.Provider>
  );
};
