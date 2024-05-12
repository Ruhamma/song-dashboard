/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import DayNightToggle from "react-day-and-night-toggle";
import { FaMusic } from "react-icons/fa6";

const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;
    const toggleTheme = () => {
      body.classList.toggle("dark-theme");
    };

    toggleTheme();

    return () => window.removeEventListener("storage", toggleTheme);
  }, [isDarkMode]);
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        padding-left: 5rem;
        padding-right: 5rem;
        transition: background-color 0.3s ease-in-out;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.5rem;
        `}
      >
        <FaMusic />
        <p
          css={css`
            font-weight: bold;
          `}
        >
          Music Library
        </p>
      </div>
      <DayNightToggle
        onChange={() => setIsDarkMode(!isDarkMode)}
        checked={isDarkMode}
        size={30}
      />
    </div>
  );
};

export default Nav;
