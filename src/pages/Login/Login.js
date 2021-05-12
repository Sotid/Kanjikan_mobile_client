import React, { Component } from "react";
import { withAuth } from "./../../context/auth.context";
import "./Login.css";
import { Link } from "react-router-dom";
class Login extends Component {
  state = { username: "", password: "" };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    // Call function coming from AuthProvider ( via withAuth )
    this.props.login(username, password);
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { username, password } = this.state;
    return (
      <div>
        <div class="wrapper">
          <div>
            <form onSubmit={this.handleFormSubmit}>
              <div className="login">
                <label>Username:</label>
                <input
                  className="input-login"
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
                <label>Password:</label>
                <input
                  className="input-login"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <button className="login-button" type="submit" value="Login">
                  Login
                </button>
                <p>You don't have an account?</p>
                <Link className="signup-link" to={"/signup"}>
                  {" "}
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(Login);
