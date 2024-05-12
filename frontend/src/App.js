// import "./App.css";
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import store from "./store/store";
import { Provider } from "react-redux";
import SongList from "./components/SongList";
import Nav from "./components/Nav";
function App() {
  return (
    <Provider store={store}>
      <Nav />
      <SongList />
    </Provider>
  );
}

export default App;
