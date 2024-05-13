/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { CiCircleList, CiEdit } from "react-icons/ci";
import { BsGrid3X3Gap } from "react-icons/bs";
import SongForm from "./SongForm";
import { Image } from "rebass";
import SongCard from "./SongCard";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongsRequest,
  getSongsSuccess,
  getSongsFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
} from "../store/slices/songSlice";
import { deleteSong, fetchSongsApi, updateSong } from "../store/api/songApi";
const SongFormOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3); /* Semi-transparent overlay */
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
  cursor: pointer;
  &.open {
    opacity: 0.5;
    z-index: 10;
  }
`;
const CategoryOverlay = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.3;
  z-index: 1;
  border-radius: 20px;
`;
const CategoryContainer = ({ backgroundImageUrl }) => css`
  background-image: url("${backgroundImageUrl}");
  background-origin: center;
  background-size: cover;
  width: 200px;
  height: 50px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 20px;
  box-shadow: 2px black;
  @media (max-width: 768px) {
    width: 120px;
  }
  @media (max-width: 600px) {
    width: 100px;
  }
  @media (max-width: 450px) {
    width: 80px;
  }
  @media (max-width: 340px) {
    width: 60px;
  }
`;
const ModalTitles = css`
  color: grey;
  font-size: 1.1rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const ModalTitleDetails = css`
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
const dummySongData = [
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    albumTitle: "A Night at the Opera",
    imageUrl: {
      public_id: "some_unique_identifier_1",
      url: "/images/pop.jpg",
    },
    genre: "Rock",
    releaseYear: 1975,
  },
  {
    title: "Imagine",
    artist: "John Lennon",
    albumTitle: "Imagine",
    imageUrl: {
      public_id: "some_unique_identifier_2",
      url: "/images/pop.jpg",
    },
    genre: "Pop",
    releaseYear: 1971,
  },
  {
    title: "Imagine",
    artist: "John Lennon",
    albumTitle: "Imagine",
    imageUrl: {
      public_id: "some_unique_identifier_2",
      url: "/images/pop.jpg",
    },
    genre: "Pop",
    releaseYear: 1971,
  },
  {
    title: "Imagine",
    artist: "John Lennon",
    albumTitle: "Imagine",
    imageUrl: {
      public_id: "some_unique_identifier_2",
      url: "/images/pop.jpg",
    },
    genre: "Pop",
    releaseYear: 1971,
  },
  {
    title: "Imagine",
    artist: "John Lennon",
    albumTitle: "Imagine",
    imageUrl: {
      public_id: "some_unique_identifier_2",
      url: "/images/pop.jpg",
    },
    genre: "Pop",
    releaseYear: 1971,
  },
  {
    title: "Imagine",
    artist: "John Lennon",
    albumTitle: "Imagine",
    imageUrl: {
      public_id: "some_unique_identifier_2",
      url: "/images/pop.jpg",
    },
    genre: "Pop",
    releaseYear: 1971,
  },
  {
    title: "Imagine",
    artist: "John Lennon",
    albumTitle: "Imagine",
    imageUrl: {
      public_id: "some_unique_identifier_2",
      url: "/images/pop.jpg",
    },
    genre: "Pop",
    releaseYear: 1971,
  },
];

const initialState = {
  title: "",
  artist: "",
  albumTitle: "",
  releaseYear: 2024,
  genre: "pop",
};
const SongList = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [display, setDisplay] = useState("list");
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editSong, setEditSong] = useState(null);
  const [editSongValues, setEditSongValues] = useState(initialState);
  const [editImages, setEditImages] = useState(null);
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.song.songs);
  const loading = useSelector((state) => state.song.loading);
  const error = useSelector((state) => state.song.error);
  const tooglePopup = () => {
    setIsPopupOpen(false);
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      dispatch(fetchSongsRequest());
      try {
        const response = await fetchSongsApi();
        dispatch(getSongsSuccess(response));
      } catch (err) {
        dispatch(getSongsFailure(err.message));
      }
    };

    fetchSongs();
  }, [dispatch]);

  const handleEdit = (song) => {
    setEditSong(song);
    setEditSongValues({
      id: song._id,
      title: song.title,
      artist: song.artist,
      albumTitle: song.albumTitle,
      releaseYear: song.releaseYear,
      genre: song.genre,
    });
    setEditImages(song.image);
  };

  

  const handleSaveEdit = async () => {
    const songData = {
      title: editSongValues.title,
      artist: editSongValues.artist,
      albumTitle: editSongValues.albumTitle,
      releaseYear: editSongValues.releaseYear,
      genre: editSongValues.genre,
      image: editImages,
    };
    try {
      dispatch(updateSongRequest());
      const response = await updateSong(editSongValues.id, songData);
      dispatch(updateSongSuccess(response));
      console.log("Song uploaded successfully!");
      setEditSong(null);
    } catch (err) {
      dispatch(updateSongFailure(err.toString()));
    }
  };
  const handleCancelEdit = () => {
    setEditSong(null);
  };
  const handleDelete = async (id) => {
    try {
      dispatch(deleteSongRequest());
      const response = await deleteSong(id);
      dispatch(deleteSongSuccess(response));

      console.log("Song deleted successfully!");
    } catch (err) {
      dispatch(deleteSongFailure(err.toString()));
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const filteredSongs = selectedCategory
    ? songs.filter(
        (song) => song.genre.toLowerCase() === selectedCategory.toLowerCase()
      )
    : songs;
  return (
    <div>
      {/* Search and upload section */}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 5rem;
          padding-right: 5rem;
          gap: 5px;
          @media (max-width: 768px) {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            padding-left: 1rem;
            padding-right: 1rem;
            gap: 15px;
            color: grey;
            margin: 2rem 0;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              padding-left: 1rem;
              padding-right: 1rem;
              padding: 0.4rem;
              gap: 5px;
              font-size: 1rem;
              width: fit-content;
              cursor: pointer;
            `}
            onClick={() => {
              setDisplay("list");
            }}
          >
            <CiCircleList />
            <p
              css={css`
                font-weight: bold;
                font-size: 0.8rem;
                @media (max-width: 425px) {
                  display: none;
                }
              `}
            >
              List
            </p>
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              padding-left: 1rem;
              padding-right: 1rem;
              padding: 0.4rem;
              gap: 5px;
              font-size: 1rem;
              width: fit-content;
              cursor: pointer;
            `}
            onClick={() => {
              setDisplay("cards");
            }}
          >
            <BsGrid3X3Gap />
            <p
              css={css`
                font-weight: bold;
                font-size: 0.8rem;
                @media (max-width: 425px) {
                  display: none;
                }
              `}
            >
              Cards
            </p>
          </div>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: 15px;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              padding-left: 1rem;
              padding-right: 1rem;
              padding: 0.4rem;
              gap: 5px;
              font-size: 1rem;
              width: fit-content;
              border-radius: 25px;
              border: 1px solid white;
              color: white;
              @media (max-width: 548px) {
                display: none;
              }
            `}
          >
            <AiOutlineSearch color="white" />
            <input
              type="text"
              id="search"
              placeholder="Search library"
              css={css`
                border: none;
                outline: none;
                padding: 0.3rem;
                background-color: black;
                color: white;
              `}
            />
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              padding: 0.7rem 1rem;
              gap: 5px;
              font-size: 1rem;
              background-color: #fbb4f2;
              width: fit-content;
              border-radius: 25px;
              cursor: pointer;
              color: black;
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(13px);
              -webkit-backdrop-filter: blur(13px);
            `}
            onClick={toggleForm}
          >
            <FaPlus />
            <p
              css={css`
                font-weight: bold;
                font-size: 0.8rem;
                @media (max-width: 548px) {
                  display: none;
                }
              `}
            >
              Upload song
            </p>
          </div>
        </div>
        {isOpen && (
          <>
            <div
              css={SongFormOverlay}
              className={isOpen ? "open" : ""}
              onClick={toggleForm}
            />

            <SongForm />
          </>
        )}
      </div>

      {/* Category section */}
      <div
        css={css`
          display: flex;
          justify-content: space-evenly;
          margin-bottom: 50px;
          margin-top: 40px;
        `}
      >
        <div
          css={CategoryContainer({ backgroundImageUrl: "/images/pop.jpg" })}
          onClick={() => setSelectedCategory("Pop")}
        >
          <div css={CategoryOverlay} />
          <p
            css={css`
              z-index: 2;
              @media (max-width: 548px) {
                font-size: 0.8rem;
              }
            `}
          >
            Pop
          </p>
        </div>
        <div
          css={CategoryContainer({ backgroundImageUrl: "/images/jazz.jpg" })}
          onClick={() => setSelectedCategory("Jazz")}
        >
          <div css={CategoryOverlay} />
          <p
            css={css`
              z-index: 2;
              @media (max-width: 548px) {
                font-size: 0.8rem;
              }
            `}
          >
            Jazz
          </p>
        </div>
        <div
          css={CategoryContainer({ backgroundImageUrl: "/images/randb.jpg" })}
          onClick={() => setSelectedCategory("R&B")}
        >
          <div css={CategoryOverlay} />
          <p
            css={css`
              z-index: 2;
              @media (max-width: 548px) {
                font-size: 0.8rem;
              }
            `}
          >
            R&B
          </p>
        </div>
        <div
          css={CategoryContainer({ backgroundImageUrl: "/images/country.jpg" })}
          onClick={() => setSelectedCategory("Country")}
        >
          <div css={CategoryOverlay} />
          <p
            css={css`
              z-index: 2;
              @media (max-width: 548px) {
                font-size: 0.8rem;
              }
            `}
          >
            Country
          </p>
        </div>
        <div
          css={CategoryContainer({ backgroundImageUrl: "/images/rock.jpg" })}
          onClick={() => setSelectedCategory("Rock")}
        >
          <div css={CategoryOverlay} />
          <p
            css={css`
              z-index: 2;
              @media (max-width: 548px) {
                font-size: 0.8rem;
              }
            `}
          >
            Rock
          </p>
        </div>
      </div>

      {/* Song list section */}
      <div
        css={css`
          background: rgba(12, 15, 10, 0.4);
          backdrop-filter: blur(13px);
          -webkit-backdrop-filter: blur(13px);
          border-radius: 10px;
          width: 90%;
          padding-top: 10px;
          margin: auto;
          @media (max-width: 548px) {
            width: 95%;
          }
        `}
      >
        <div
          className="header"
          css={css`
            color: grey;
            font-size: 0.8rem;
            display: flex;
            justify-content: space-between;
            padding-left: 6rem;
            padding-right: 5rem;
            margin-top: 10px;
            ${display === "cards" ? "display: none;" : ""}
          `}
        >
          <p>Name</p>
          <div
            css={css`
              display: flex;
              gap: 60px;
              text-align: right;
            `}
          >
            <p
              css={css`
                display: block;
                @media (max-width: 768px) {
                  display: none;
                }
              `}
            >
              Album
            </p>
            <p
              css={css`
                @media (max-width: 768px) {
                  margin-left: 120px;
                }
                @media (max-width: 375px) {
                  display: none;
                }
              `}
            >
              Genre
            </p>
            <p
              css={css`
                display: block;
                @media (max-width: 768px) {
                  display: none;
                }
              `}
            >
              Release Year
            </p>
            <p
              css={css`
                opacity: 0;
              `}
            >
              Release{" "}
            </p>
          </div>
        </div>
        <hr
          css={css`
            margin: 1rem 5rem;
            @media (max-width: 548px) {
              margin: 1rem 2rem;
            }
            ${display === "cards" ? "display: none;" : ""}
          `}
        />
        {display === "list" ? (
          <>
            {filteredSongs.map((song, key) => (
              <div
                key={key}
                css={css`
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0.4rem;
                  padding-top: 1rem;
                  padding-bottom: 1rem;
                  border-bottom: 1px solid lightgray;
                  color: grey;
                  font-size: 0.9rem;
                  margin-left: 5rem;
                  margin-right: 5rem;
                  transition: background-color 0.4s ease-in-out;
                  &:hover {
                    background-color: #282828;
                    transition: background-color 0.4s ease-in-out;
                  }
                  @media (max-width: 548px) {
                    margin: 1rem 1rem;
                  }
                `}
              >
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    transition: scale 0.4s ease-in-out;

                    &:hover {
                      scale: 1.05;
                      transition: scale 0.4s ease-in-out;
                    }
                  `}
                  onClick={() => {
                    setSelectedSong(song);
                    setIsPopupOpen(true);
                  }}
                >
                  <Image
                    width={90}
                    height={80}
                    src={song.image.url}
                    alt="Song Image"
                    css={css`
                      border-radius: 20px;
                    `}
                  />
                  <div
                    css={css`
                      height: fit-content;
                    `}
                  >
                    <p
                      css={css`
                        font-size: 1rem;
                        font-weight: bold;
                        color: white;
                      `}
                    >
                      {song.title}
                    </p>
                    <p
                      css={css`
                        font-size: 0.9rem;
                      `}
                    >
                      {song.artist}
                    </p>
                  </div>
                </div>
                <div
                  css={css`
                    display: flex;
                    gap: 60px;
                  `}
                >
                  <p
                    css={css`
                      display: block;
                      @media (max-width: 768px) {
                        display: none;
                      }
                    `}
                  >
                    {song.albumTitle}
                  </p>
                  <p
                    css={css`
                      @media (max-width: 375px) {
                        display: none;
                      }
                    `}
                  >
                    {song.genre}
                  </p>
                  <p
                    css={css`
                      display: block;
                      @media (max-width: 768px) {
                        display: none;
                      }
                    `}
                  >
                    {song.releaseYear}
                  </p>
                  <div
                    css={css`
                      display: flex;
                      gap: 10px;
                      font-size: 1rem;
                      color: white;
                    `}
                  >
                    <CiEdit
                      size={20}
                      css={css`
                        cursor: pointer;
                        border-radius: 50%;
                        &:hover {
                          scale: 1.1;
                          transition: scale 0.4s ease-in-out;
                        }
                      `}
                      onClick={() => {
                        setSelectedSong(song);
                        setIsPopupOpen(true);
                      }}
                    />
                    <MdDeleteOutline
                      size={20}
                      css={css`
                        color: red;
                        cursor: pointer;
                      `}
                      onClick={() => handleDelete(song._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-row-gap: 40px;
              padding: 10px;
              place-items: center;

              @media (max-width: 1060px) {
                grid-template-columns: repeat(3, 1fr);
              }

              @media (max-width: 690px) {
                grid-template-columns: repeat(2, 1fr);
              }

              @media (max-width: 340px) {
                grid-template-columns: repeat(1, 1fr);
              }
            `}
          >
            {songs.map((song, key) => (
              <div
                onClick={() => {
                  setSelectedSong(song);
                  setIsPopupOpen(true);
                }}
              >
                <SongCard data={song} />
              </div>
            ))}
          </div>
        )}
      </div>
      {isPopupOpen && selectedSong && (
        <>
          <div
            css={SongFormOverlay}
            className={isPopupOpen ? "open" : ""}
            onClick={tooglePopup}
          />
          <div
            css={css`
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background-color: black;
              padding: 2rem;
              border-radius: 10px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
              z-index: 10;
              width: 40%;
              @media (max-width: 768px) {
                width: 80%;
              }
            `}
          >
            <div>
              <Image
                height={280}
                src={selectedSong.image.url}
                alt="Song Image"
                css={css`
                  border-radius: 20px;
                  width: 100%;
                  object-fit: cover;
                  margin-top: 10px;
                  @media (min-width: 640px) {
                    grid-template-columns: repeat(3, 1fr);
                  }

                  @media (min-width: 1280px) {
                    grid-template-columns: repeat(4, 1fr);
                  }

                  @media (max-width: 768px) {
                    height: 200px;
                  }
                `}
              />
              {editSong === selectedSong ? (
                <input
                  className="text-red-900"
                  type="text"
                  value={editSongValues.title}
                  onChange={(e) =>
                    setEditSongValues({
                      ...editSongValues,
                      title: e.target.value,
                    })
                  }
                  css={css`
                    background-color: black;
                    color: white;
                    border: 1px solid white;
                    border-radius: 3px;
                    padding: 0.5rem;
                    margin-left: auto;
                    margin-right: auto;
                    text-align: center;
                    width: fit-content;
                    display: flex;
                  `}
                />
              ) : (
                <h2
                  css={css`
                    text-align: center;
                    margin-top: 20px;
                  `}
                >
                  {selectedSong.title}
                </h2>
              )}

              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  margin: 1rem;
                `}
              >
                <p css={ModalTitles}>Artist</p>
                {editSong === selectedSong ? (
                  <input
                    className="text-red-900"
                    type="text"
                    value={editSongValues.artist}
                    onChange={(e) =>
                      setEditSongValues({
                        ...editSongValues,
                        artist: e.target.value,
                      })
                    }
                    css={css`
                      background-color: black;
                      color: white;
                      border: 1px solid white;
                      border-radius: 3px;
                      padding: 0.5rem;
                    `}
                  />
                ) : (
                  <p css={ModalTitleDetails}>{selectedSong.artist}</p>
                )}
              </div>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  margin: 1rem;
                `}
              >
                <p css={ModalTitles}>Album</p>
                {editSong === selectedSong ? (
                  <input
                    className="text-red-900"
                    type="text"
                    value={editSongValues.albumTitle}
                    onChange={(e) =>
                      setEditSongValues({
                        ...editSongValues,
                        albumTitle: e.target.value,
                      })
                    }
                    css={css`
                      background-color: black;
                      color: white;
                      border: 1px solid white;
                      border-radius: 3px;
                      padding: 0.5rem;
                    `}
                  />
                ) : (
                  <p css={ModalTitleDetails}>{selectedSong.albumTitle}</p>
                )}
              </div>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  margin: 1rem;
                `}
              >
                <p css={ModalTitles}>Genre</p>
                {editSong === selectedSong ? (
                  <input
                    className="text-red-900"
                    type="text"
                    value={editSongValues.genre}
                    onChange={(e) =>
                      setEditSongValues({
                        ...editSongValues,
                        genre: e.target.value,
                      })
                    }
                    css={css`
                      background-color: black;
                      color: white;
                      border: 1px solid white;
                      border-radius: 3px;
                      padding: 0.5rem;
                    `}
                  />
                ) : (
                  <p css={ModalTitleDetails}>{selectedSong.genre}</p>
                )}
              </div>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  margin: 1rem;
                `}
              >
                <p css={ModalTitles}>Release Year</p>
                {editSong === selectedSong ? (
                  <input
                    className="text-red-900"
                    type="number"
                    value={editSongValues.releaseYear}
                    onChange={(e) =>
                      setEditSongValues({
                        ...editSongValues,
                        releaseYear: e.target.value,
                      })
                    }
                    css={css`
                      background-color: black;
                      color: white;
                      border: 1px solid white;
                      border-radius: 3px;
                      padding: 0.5rem;
                    `}
                  />
                ) : (
                  <p css={ModalTitleDetails}>{selectedSong.releaseYear}</p>
                )}
              </div>
            </div>
            {editSong === selectedSong ? (
              <div>
                <button
                  css={css`
                    padding: 0.5rem 1rem;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 1rem;
                    transition: background-color 0.5s ease-in;
                    width: 100%;
                    background: rgba(10, 100, 0, 0.3);
                    backdrop-filter: blur(13px);
                    -webkit-backdrop-filter: blur(13px);
                  `}
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
                <button
                  css={css`
                    padding: 0.5rem 1rem;
                    background-color: #f86adc;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 1rem;
                    transition: background-color 0.5s ease-in;
                    width: 100%;
                    background: rgba(159, 22, 22, 0.3);
                    backdrop-filter: blur(13px);
                    -webkit-backdrop-filter: blur(13px);
                  `}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                css={css`
                  padding: 0.5rem 1rem;
                  background-color: #f86adc;
                  color: white;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  margin-top: 1rem;
                  transition: background-color 0.5s ease-in;
                  width: 100%;
                  background: rgba(12, 15, 10, 0.9);
                  backdrop-filter: blur(13px);
                  -webkit-backdrop-filter: blur(13px);
                  &:hover {
                    background-color: white;
                    color: black;
                    transition: all 0.5s ease-in;
                  }
                `}
                onClick={() => handleEdit(selectedSong)}
              >
                Edit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SongList;
