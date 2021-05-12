import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Music.css";

function Music () {

  const [music, setMusic] = useState([])
  const [isReady, setIsReady] = useState(false)

  const loadMusic = async () => {
    try {
      let res = await axios.get(
        "https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=japan&api_key=d620d7726ae86f44b956c1a641beeb9f&format=json"
      );
      if (res) {
        const { data } = res;
        setMusic( data)
        setIsReady(true)
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
   loadMusic()
  }, [])


    return (
      <div>
        <h1 className="music-title">Click to listen to japanese music</h1>
        <div className="artists">
          {isReady &&
            music.topartists.artist
              .sort((a, b) => b.name.localeCompare(a.name))
              .splice(0, 16)
              .map((oneArtist) => (
                <div>
                  <a href={oneArtist.url} target="_blank">
                    {oneArtist.name}
                  </a>
                </div>
              ))}
        </div>
      </div>
    );
  }

export default Music;
