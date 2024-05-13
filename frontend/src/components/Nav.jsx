/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import DayNightToggle from "react-day-and-night-toggle";
import { FaMusic } from "react-icons/fa6";

const Nav = () => {
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
        @media (max-width: 768px) {
          justify-content: center;
          padding: 0 0.5rem;
        }
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
    </div>
  );
};

export default Nav;
