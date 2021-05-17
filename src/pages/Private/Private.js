import React, { useState, useEffect } from "react";
import { withAuth } from "./../../context/auth.context";
import EditProfile from "../../components/EditProfile/EditProfile";
import privateService from "./../../services/private.service";
import AuthService from "./../../services/auth.service";
import "./Private.css";


function Private (props) {

  const [showEdit, setShowEdit] = useState(false)
  const [kanjis, setKanjis] = useState([])
  const [bookmarks, setBookmarks] = useState([])
 

  const toggleEdit = () => {
   setShowEdit( !showEdit);
  };

  useEffect(() => {
    const bookmarksArr = [...props.user.bookmarks];
   setKanjis( bookmarksArr);
  }, [])

 

  const deleteKanji = (kanjiId, userId) => {
    privateService.deleteFromBookmarks(kanjiId, userId);
    const newArr = [...kanjis];
    const filtered = newArr.filter((deleted) => {
      return deleted._id !== kanjiId;
    });
    setKanjis(filtered);
    props.user.bookmarks = filtered;
    AuthService.me();
  };

  return (
      <div className="user-details">
        <h2>Welcome {props.user && props.user.username}!</h2>
        <div>
          <p>Email: {props.user.email}</p>
          <button className="edit-btn" onClick={toggleEdit}>
            Edit
          </button>
          {showEdit ? <EditProfile /> : null}
        </div>
        <br />
        <h3>My bookmarks</h3>
        <div className="card profile-columns">
          {kanjis.length === 0
            ? props.user.bookmarks.map((data) => {
                const {
                  kanji,
                  grade,
                  stroke_count,
                  meanings,
                  kun_readings,
                  on_readings,
                } = data;
                return (
                  <div
                    className="flip-container-private"
                    ontouchstart="this.classList.toggle('hover');"
                  >
                    <div className="flipper">
                      <div className="front">
                        <h1> {kanji}</h1>
                        <p>{meanings.map((meaning) => meaning + ", ")}</p>
                      </div>
                      <div className="back">
                        <h2> {kanji}</h2>
                        <ul>
                          <li> Difficulty level: {grade}</li>
                          <li> Strokes: {stroke_count}</li>
                          <li>
                            {" "}
                            Meanings:
                            {meanings.map((meaning) => meaning + ", ")}
                          </li>
                          <li>
                            {" "}
                            Kunyomi: {kun_readings.map((kun) => kun + ", ")}
                          </li>
                          <li> Onyomi: {on_readings.map((on) => on + ", ")}</li>
                        </ul>
                        <button
                          className="delete-bookmarks"
                          onClick={() =>
                            deleteKanji(data._id, this.props.user._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : kanjis.map((data) => {
                const {
                  kanji,
                  grade,
                  stroke_count,
                  meanings,
                  kun_readings,
                  on_readings,
                } = data;
                
                return (
                  <div
                    className="flip-container"
                    ontouchstart="this.classList.toggle('hover');"
                  >
                    <div className="flipper">
                      <div className="front">
                        <h1> {kanji}</h1>
                        <p>{meanings.map((meaning) => meaning + ", ")}</p>
                      </div>
                      <div className="back">
                        <h2> {kanji}</h2>
                        <ul>
                          <li> Difficulty level: {grade}</li>
                          <li> Strokes: {stroke_count}</li>
                          <li>
                            {" "}
                            Meanings:{" "}
                            {meanings.map((meaning) => meaning + ", ")}
                          </li>
                          <li>
                            {" "}
                            Kunyomi: {kun_readings.map((kun) => kun + ", ")}
                          </li>
                          <li> Onyomi: {on_readings.map((on) => on + ", ")}</li>
                        </ul>
                        <button
                          className="delete-bookmarks"
                          onClick={() =>
                          deleteKanji(data._id, props.user._id)
                          }
                        >
                          {" "}
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    );
  }

export default withAuth(Private);