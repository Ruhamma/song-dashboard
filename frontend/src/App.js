/** @jsxImportSource @emotion/react */
import "./App.css";
import { css } from "@emotion/react";
import store from "./store/store";
import { Provider } from "react-redux";
import SongList from "./components/SongList";
import Nav from "./components/Nav";
import { Toaster } from "sonner";

function App() {
  return (
    <Provider store={store}>
      <div
      
      >
        <Nav />
        <SongList />
      </div>
      <Toaster richColors />
    </Provider>
  );
}

export default App;
