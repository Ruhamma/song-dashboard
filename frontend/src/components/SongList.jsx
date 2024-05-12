/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { CiCircleList, CiEdit } from "react-icons/ci";
import { BsGrid3X3Gap } from "react-icons/bs";
import SongForm from "./SongForm";
import { Image } from "rebass";
import SongCard from "./SongCard";
import { MdDeleteOutline } from "react-icons/md";
const SongFormOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
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
const SongList = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [display, setDisplay] = useState("list");
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const tooglePopup = () => {
    setIsPopupOpen(false);
    console.log(isPopupOpen);
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };
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
              border: 1px solid black;
              @media (max-width: 548px) {
                display: none;
              }
            `}
          >
            <AiOutlineSearch color="black" />
            <input
              type="text"
              id="search"
              placeholder="Search library"
              css={css`
                border: none;
                outline: none;
                padding: 0.3rem;
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
        <div css={CategoryContainer({ backgroundImageUrl: "/images/pop.jpg" })}>
          <div css={CategoryOverlay} />
          <p
            css={css`
              z-index: 2;
            `}
          >
            Pop
          </p>
        </div>
        <div
          css={CategoryContainer({ backgroundImageUrl: "/images/jazz.jpg" })}
        >
          <div css={CategoryOverlay} />
          <p
            css={css`
              z-index: 2;
            `}
          >
            Jazz
          </p>
        </div>
        <div
          css={CategoryContainer({ backgroundImageUrl: "/images/randb.jpg" })}
        >
          <div css={CategoryOverlay} />
          <p
            css={css`
              z-index: 2;
            `}
          >
            R&B
          </p>
        </div>
        <div
          css={CategoryContainer({ backgroundImageUrl: "/images/country.jpg" })}
        >
          <div css={CategoryOverlay} />
          <p
            css={css`
              z-index: 2;
            `}
          >
            Country
          </p>
        </div>
        <div
          css={CategoryContainer({ backgroundImageUrl: "/images/rock.jpg" })}
        >
          <div css={CategoryOverlay} />
          <p
            css={css`
              z-index: 2;
            `}
          >
            Rock
          </p>
        </div>
      </div>

      {/* Song list section */}
      <div>
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
          `}
        />
        {display === "list" ? (
          <>
            {dummySongData.map((song, key) => (
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
                  cursor: pointer;
                  transition: background-color 0.4s ease-in-out;

                  &:hover {
                    background-color: #f4f4f9;
                    transition: background-color 0.4s ease-in-out;
                  }
                  @media (max-width: 548px) {
                    margin: 1rem 1rem;
                  }
                `}
                onClick={() => {
                  setSelectedSong(song);
                  setIsPopupOpen(true);
                }}
              >
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    gap: 10px;
                  `}
                >
                  <Image
                    width={90}
                    height={80}
                    src="/images/pop.jpg"
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
                        color: black;
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
                      color: black;
                    `}
                  >
                    <CiEdit
                      size={20}
                      css={css`
                        cursor: pointer;
                      `}
                    />
                    <MdDeleteOutline
                      size={20}
                      css={css`
                        color: red;
                        cursor: pointer;
                      `}
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

              @media (max-width: 630px) {
                grid-template-columns: repeat(2, 1fr);
              }

              @media (max-width: 340px) {
                grid-template-columns: repeat(1, 1fr);
              }
            `}
          >
            {dummySongData.map((song, key) => (
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
              background-color: white;
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
                src={"/images/jazz.jpg"}
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
              <h2
                css={css`
                  text-align: center;
                  margin-top: 20px;
                `}
              >
                {selectedSong.title}
              </h2>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  margin: 1rem;
                `}
              >
                <p css={ModalTitles}>Artist</p>
                <p css={ModalTitleDetails}>{selectedSong.artist}</p>
              </div>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  margin: 1rem;
                `}
              >
                <p css={ModalTitles}>Album</p>
                <p css={ModalTitleDetails}>{selectedSong.albumTitle}</p>
              </div>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  margin: 1rem;
                `}
              >
                <p css={ModalTitles}>Genre</p>
                <p css={ModalTitleDetails}>{selectedSong.genre}</p>
              </div>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  margin: 1rem;
                `}
              >
                <p css={ModalTitles}>Release Year</p>
                <p css={ModalTitleDetails}>{selectedSong.releaseYear}</p>
              </div>
            </div>
            <button
              onClick={() => setIsPopupOpen(false)}
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
                &:hover {
                  background-color: #f86adc;
                  transition: background-color 0.5s ease-in;
                }
              `}
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SongList;
