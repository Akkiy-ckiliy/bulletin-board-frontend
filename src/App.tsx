import { useEffect } from "react"; // ★追加
import axios from "axios";         // ★追加 (npm install axios が必要)
import { Route, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Main from "./pages/Main";
import { UserProvider } from "./providers/UserProvider";

function App() {
  // ▼▼▼ ここにテストコードを追加します ▼▼▼
  useEffect(() => {
    // 画面が開かれた瞬間にバックエンドに挨拶しに行く
    axios.get('http://localhost:3000/test-db')
      .then(res => {
        console.log("✅ 接続成功！DBからの返事:", res.data);
      })
      .catch(err => {
        console.error("❌ 接続エラー:", err);
      });
  }, []);
  // ▲▲▲ ここまで ▲▲▲

  return (
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