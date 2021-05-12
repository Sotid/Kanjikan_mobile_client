import React, { Component } from "react";
import { withAuth } from "./../../context/auth.context";
import "./Signup.css";
class Signup extends Component {
  state = { username: "", email: "", password: "" };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    this.props.signup(username, email, password);
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { username, email, password } = this.state;
    return (
      <div>
        <div class="wrapper">
          <div>
            <form onSubmit={this.handleFormSubmit}>
              <div className="signup">
                <label>Username:</label>
                <input
                  className="input-signup"
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
                <label>Email:</label>
                <input
                  className="input-signup"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <label>Password:</label>
                <input
                  className="input-signup"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <button className="signup-button" type="submit" value="Login">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(Signup);
