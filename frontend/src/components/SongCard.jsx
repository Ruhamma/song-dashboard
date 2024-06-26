/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { Image } from "rebass";
import { MdDeleteOutline } from "react-icons/md";

const SongCard = ({ data, onEdit, onDelete }) => {
  return (
    <div
      css={css`
        width: fit-content;
        height: 300px;
        color: grey;
        box-shadow: 5px black;
        cursor: pointer;
        background: rgba(12, 15, 10, 0.6);
        backdrop-filter: blur(13px);
        -webkit-backdrop-filter: blur(13px);
        border-radius: 20px;
        padding: 2px;
        &:hover {
          scale: 1.05;
          transition: scale 0.4s ease-in-out;
        }

        @media (max-width: 783px) {
          width: 200px;
        }
        @media (max-width: 453px) {
          width: 170px;
        }
        @media (max-width: 340px) {
          width: 250px;
        }
      `}
    >
      <Image
        src={data.image.url}
        width={250}
        height={200}
        css={css`
          border-radius: 20px;
        `}
      />
      <p
        css={css`
          font-weight: bold;
          color: white;
        `}
      >
        {data.title}
      </p>
      <p
        css={css`
          font-size: 0.8rem;
        `}
      >
        {data.artist}
      </p>

      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          font-size: 1rem;
          color: white;
        `}
      >
        <CiEdit
          size={20}
          css={css`
            cursor: pointer;
          `}
          onClick={onEdit}
        />
        <MdDeleteOutline
          size={20}
          css={css`
            color: red;
            cursor: pointer;
          `}
          onClick={() => onDelete(data._id)}
        />
      </div>
    </div>
  );
};

export default SongCard;
