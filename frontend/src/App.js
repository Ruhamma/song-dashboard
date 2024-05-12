/** @jsxImportSource @emotion/react */
import "./App.css";
import React from "react";
import { css,Global } from "@emotion/react";
import store from "./store/store";
import { Provider } from "react-redux";
import SongList from "./components/SongList";
import Nav from "./components/Nav";

function App() {
  return (
    <Provider store={store}>
      <Global
        styles={css`
          .secondary-color {
            color: grey !important;
          }
        `}
      />
      <Nav />
      <SongList />
    </Provider>
  );
}

export default App;
