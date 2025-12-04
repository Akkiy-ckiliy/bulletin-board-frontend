//reactを立ち上げたらまずここをきれいにする(全削除ではなくreturnの中身とか不要なimport文を消す)
//基本的にApp.css,logo.svgはいらない。

import SignIn from "./pages/SignIn";//ここはモジュールからコンポーネントを読み込んでいる
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import Main from "./pages/Main";

function App() {
  return (
    //ここの下に画面に読み込ませるファイルのコンポーネントを書く。
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
