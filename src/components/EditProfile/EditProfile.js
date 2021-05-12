import React, { useState } from "react";
import PrivateService from "../../services/private.service";
import { withAuth } from "./../../context/auth.context";
import "./EditProfile.css";

function EditProfile (props)  {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
const [value, setValue] = useState({ username: "", email: "", password: "" })
 
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { _id } = props.user;
    const {username, email, password} = value

    PrivateService.editProfile(username, email, password, _id);
setValue({ username: "", email: "", password: "" })

  };

 const handleChange = (event) => {
    console.log(event.target)
    setValue({ ...value, [event.target.name]: event.target.value });

  };

    return (
      <div className="edit-container">
        <div className="edit-form">
          <form onSubmit={handleFormSubmit}>
            <label>Username:</label>
            <input
              className="slide"
              type="text"
              name="username"
              placeholder={props.user.username}
              value={username}
              onChange={handleChange}
            />
            <label>Email:</label>
            <input
              className="slide"
              name="email"
              type="email"
              placeholder={props.user.email}
              value={email}
              onChange={handleChange}
            />
            <label>Password:</label>
            <input
              className="slide"
              name="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={handleChange}
            />
            <button type="submit" value="Submit">
              Apply
            </button>
          </form>
        </div>
      </div>
    );
  }

export default withAuth(EditProfile);
