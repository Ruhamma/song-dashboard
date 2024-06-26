/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Button, Image } from "rebass";
import { useDispatch } from "react-redux";
import defaultImage from "../assets/images/vinyl.jpeg";
import {
  submitSongRequest,
  submitSongFailure,
  submitSongSuccess,
} from "../store/slices/songSlice";

import { submitSong } from "../store/api/songApi";
import { toast } from "sonner";
import { IoMdClose } from "react-icons/io";

const SongFormHInputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 10px;
`;
const SongFormInput = css`
  padding: 0.5rem;
  border: 1px solid #181818;
  outline: none;
  box-shadow: 1px solid white;
  border-radius: 4px;
  font-size: 1rem;
  color: white;
  background-color: black;
`;
const SongFormGenreSelect = css`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  color: white;
  background-color: black;
`;
const SongForm = ({toggleForm}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(2024);
  const [genre, setGenre] = useState("pop");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  console.log(imagePreview);
  const genres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "Electronic",
    "R&B",
    "Country",
    "Rap",
    "Jazz",
    "Other",
  ];
  useEffect(() => {
    fetch(defaultImage)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (reader.readyState === 2) {
            setImagePreview(defaultImage);
            setImage(reader.result);
          }
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.log("Error loading default image:", error);
      });
  }, []);
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setImagePreview(e.target.result);
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSongSubmit = async (event) => {
    event.preventDefault();
    console.log(image);
    const songData = {
      title,
      artist,
      albumTitle,
      releaseYear,
      genre,
      image,
    };
    console.log(songData);
    try {
      dispatch(submitSongRequest());
      const response = await submitSong(songData);
      dispatch(submitSongSuccess(response));
      setAlbumTitle("");
      setTitle("");
      setGenre("");
      setReleaseYear("");

      toast("Song uploaded successfully!");
    } catch (err) {
      dispatch(submitSongFailure(err.toString()));
    }
  };

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          background-color: black;
          border-radius: 5px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -40%);
          width: 40%;
          z-index: 30;
          color: white;
          @media (max-width: 768px) {
            width: 80%;
            transform: translate(-50%, -40%);
          }
        `}
        className="form"
      >
        <IoMdClose
          css={css`
            color: white;
            position: absolute;
            font-size: 1.2rem;
            top: 10px;
            right: 10px;
            cursor: pointer;
          `}
          onClick={toggleForm}
        />
        <h2
          css={css`
            text-align: center;
          `}
        >
          Upload Song Information
        </h2>
        <form
          css={css`
            padding: 2rem;
          `}
          onSubmit={handleSongSubmit}
        >
          <div css={SongFormHInputContainer}>
            <label htmlFor="title">
              Title{" "}
              <span
                css={css`
                  color: red;
                `}
              >
                *
              </span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Lighter fluid"
              required
              css={SongFormInput}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div css={SongFormHInputContainer}>
            <label htmlFor="artist">
              Artist{" "}
              <span
                css={css`
                  color: red;
                `}
              >
                *
              </span>
            </label>
            <input
              type="text"
              id="artist"
              name="artist"
              placeholder="Nobigdyl"
              required
              css={SongFormInput}
              onChange={(e) => setArtist(e.target.value)}
              value={artist}
            />
          </div>

          <div css={SongFormHInputContainer}>
            <label htmlFor="artist">
              Album Title
              <span
                css={css`
                  color: red;
                `}
              >
                *
              </span>
            </label>
            <input
              type="text"
              id="artist"
              name="artist"
              placeholder="Fluid"
              required
              css={SongFormInput}
              onChange={(e) => setAlbumTitle(e.target.value)}
              value={albumTitle}
            />
          </div>
          <div css={SongFormHInputContainer}>
            <label htmlFor="artist">
              Release year
              <span
                css={css`
                  color: red;
                `}
              >
                *
              </span>
            </label>
            <input
              type="number"
              id="artist"
              name="artist"
              min={0}
              required
              css={SongFormInput}
              onChange={(e) => setReleaseYear(parseInt(e.target.value))}
              value={releaseYear}
            />
          </div>
          <div css={SongFormHInputContainer}>
            <label htmlFor="genre">
              Genre{" "}
              <span
                css={css`
                  color: red;
                `}
              >
                *
              </span>{" "}
            </label>
            <select
              id="genre"
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              css={SongFormGenreSelect}
              required
            >
              {genres.map((genreOption) => (
                <option key={genreOption} value={genreOption}>
                  {genreOption}
                </option>
              ))}
            </select>
          </div>
          <div css={SongFormHInputContainer}>
            <label htmlFor="file">
              Song Image
              <span
                css={css`
                  font-size: 0.5rem;
                  font-weight: 200;
                  padding-left: 1px;
                  font-style: italic;
                `}
              >
                (optional)
              </span>{" "}
            </label>
            <p
              css={css`
                font-size: 0.6rem;
                font-weight: 200;
                padding-left: 1px;
                font-style: italic;
              `}
            >
              Add Image sizes lower than 50kb
            </p>
            <input
              type="file"
              id="file"
              name="file"
              css={SongFormInput}
              onChange={handleImageChange}
            />
            {image && (
              <Image
                width={100}
                src={imagePreview}
                alt="Selected Song Image"
                borderRadius={150}
                css={css`
                  margin-bottom: 10px;
                `}
              />
            )}
          </div>
          <Button
            css={css`
              width: 100%;
              margin-top: 10px;
              background: rgba(12, 15, 10, 0.9);
              backdrop-filter: blur(13px);
              -webkit-backdrop-filter: blur(13px);
              transition: all 0.3s ease-in;

              cursor: pointer;
              &:hover {
                background-color: white;
                color: black;
                transition: all 0.3s ease-in;
              }
            `}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default SongForm;
