//投稿を1件表示するためのファイル

import React from "react";
import styled from "styled-components";
import { ReactNode } from "react";

// 型定義を追加（TypeScriptの恩恵を受けるため）
type PostData = {
  user_name: string;
  created_at: Date | string; // 文字列で来る可能性も考慮
  content: string;
};

type Props = {
  post: PostData;
};

export default function Post(props: Props) {
  const { post } = props;

  const getDateStr = (dateSrc: Date | string) => {
    //日付のデータをさらにわかりやすく変更
    const dateObj = new Date(dateSrc);

    if (isNaN(dateObj.getTime())) return "日付不明"; //無効な日付はエラー処理

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; //0からスタートなので0月はないから＋１が必要
    //余談:月は英語では1,2…って言わないから文字列取得のために0スタートになってるみたいなので注意

    const date = dateObj.getDate();
    const hour = dateObj.getHours();
    const min = dateObj.getMinutes();
    const sec = dateObj.getSeconds();

    return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;
  };

  const getLines = (src: string): ReactNode => {
    //改行を挟んで読みやすくするとこ
    //(Reactは改行は無視なので\nがデータとして入ってるところに<br>を挟む)
    return src.split("\n").map((line, index) => {
      return (
        <React.Fragment key={index}>
          {/* React.Fragmentを使うと画面構成には影響しないでセットを作れる 
          indexは何番目かを管理するために必要な識別番号*/}

          {line}
          {/* これで文字表示 */}
          <br />
        </React.Fragment>
      );
    });
  };

  return ( //出力処理
    <SPost>
      <div>
        <SName>{post.user_name}</SName>
        <SDate>{getDateStr(post.created_at)}</SDate>
      </div>
      <div>{getLines(post.content)}</div>
    </SPost>
  );
}

//これ以下はスタイル変更
const SPost = styled.div`
  margin: 8px 0px;
  border-bottom: 1px solid #aaaaaa;
  text-align: left;
  padding-left: 8px;
`;

const SName = styled.span`
  font-size: small;
  color: #000044;
  font-weight: bold;
`;

const SDate = styled.span`
  margin-left: 8px;
  font-size: small;
  color: #888;
`;
