// import React, {useState, useEffect} from "react";
// import lessonsService from "../../services/lessons.service";
// import { Link } from "react-router-dom";
// import "./Home.css";

// function Home () {

//   const [lessons, setLessons] = useState()

//   const loadLessons = () => {
//     lessonsService
//       .getAllLessons()
//       .then((lesson) => setLessons(lesson));
//   };

//   useEffect(() => {
//     loadLessons()
//   }, []);

//     return (
//       <div className="lessons-container">
//         {lessons && lessons.map((allLessons) => (
//           <div className="all-buttons" key={allLessons._id}>
//             <Link className="lessons-link" to={`/lessons/${allLessons._id}`}>
//               <h2 className="lessons-text"> {allLessons.name}</h2>
//             </Link>
//           </div>
//         ))}
//       </div>
//     );
//   }

// export default Home;

import React from "react";
import lessonsService from "../../services/lessons.service";
import { Link } from "react-router-dom";
import KanjiDetails from "../KanjiDetails/Kanji.details";
import "./Home.css";

class Home extends React.Component {
  state = {
    lessons: [],
  };

  componentDidMount() {
    this.loadLessons();
  }

  loadLessons = () => {
    lessonsService
      .getAllLessons()
      .then((lesson) => this.setState({ lessons: lesson }));
  };

  render() {
    const { lessons } = this.state;
    return (
      <div className="lessons-container">
        {lessons.map((allLessons) => (
          <div className="all-buttons" key={allLessons._id}>
            <Link className="lessons-link" to={`/lessons/${allLessons._id}`}>
              <h2 className="lessons-text"> {allLessons.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
export default Home;
