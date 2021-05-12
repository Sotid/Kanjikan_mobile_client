import React, {useState} from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../../context/auth.context";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {NavbarData} from "./NavbarData"
import "./NavBar.css"

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (

    <nav>
          <img className="logo" src="https://i.postimg.cc/fL88FzDF/logo.png" />

      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars style={{color:"#9e0505"}} onClick={showSidebar}/>
        </Link>
      </div>

      <div className={sidebar ? "nav-menu active" : "nav-menu" }> 
<ul className= "nav-menu-items"  onClick={showSidebar}>
<li className="navbar-toggle">
<Link to="#" className="menu-bars">
          <AiIcons.AiOutlineClose style={{color:"#9e0505"}}/>
        </Link>

</li>
  {NavbarData.map((item, index) => {
  return (
<li key={index} className= {item.cName}>
<Link to={item.path}>

<span>{item.title}</span>
</Link>


</li>  
)
  
  })}
</ul>
 {props.isLoggedIn ? (
          <>
            <button className="logout" onClick={props.logout}>
              <img
                id="logout-img"
                src="https://i.postimg.cc/4dRnX8yd/logout.png"
              />
            </button>
          </>
        ) : (
          <>
          <div className="buttons-container"> 
            <Link to="/login">
              <button className="navbar-button">Login</button>{" "}
            </Link>
            <br />
            <Link to="/signup">
              <button className="navbar-button">Sign Up</button>{" "}
            </Link>
            </div>
          </>
        )} 
      </div>
      {/* {/* <img className="logo" src="https://i.postimg.cc/fL88FzDF/logo.png" />
        <div>
          <ul className="nav-list">
            <Link to={"/lessons"} className="nav-text">
              <li>Home</li>
            </Link>

            <Link to={"/quiz"} className="nav-text">
              <li>Quiz</li>
            </Link>

            <Link to={"/dictionary"} className="nav-text">
              <li>Dictionary</li>
            </Link>

            <Link to={"/resources"} className="nav-text">
              <li>Resources</li>
            </Link>

            <Link to={"/private"} className="nav-text">
              <li>My profile</li>
            </Link>
          </ul>
        </div> */}
        
    </nav>
  );
}

export default withAuth(Navbar);
