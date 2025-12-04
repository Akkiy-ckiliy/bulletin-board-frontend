//まずはimport reportWebVitals from './reportWebVitals'とreportWebVitals();を削除する(googleへの情報提供コード)
//その後各不要ファイルの削除。

import React from "react"; //tsをjsに変換して使えるようにしてくれてるやつ
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
