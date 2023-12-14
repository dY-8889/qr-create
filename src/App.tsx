import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";


const App = () => {
  const [path, setPath] = useState("");
  const [text, setText] = useState("");

  async function qr_create() {
    await invoke("qr", { text: text, path: "../public/" + path });
  }

  return (
    <div className="container">
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          qr_create();
        }}
      >
        <div id="inputs">
          <input
            className="text-input"
            onChange={(e) => setText(e.currentTarget.value)}
            placeholder="テキストを入力"
          />
          <input
            className="text-input"
            onChange={(e) => setPath(e.currentTarget.value)}
            placeholder="画像の名前を入力(フルパス) 例: C:/Users/ユーザーの名前/Desktop/qr.png"
          />
        </div>

        <button type="submit">OK</button>
      </form>

      <img id="qr-result" src={"/public/" + path} />
    </div>
  );
}

export default App;
