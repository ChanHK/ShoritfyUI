import React, { Component } from "react";
import styles from "../../styles/login.module.css";
import Title from "../../components/title.jsx";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: null,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    const newUser = {
      username: this.state.username,
      password: this.state.password,
    };

    e.preventDefault();
    // Add your login logic here
  };

  render() {
    const { username, password, message } = this.state;

    return (
      <div className={styles.main}>
        <div className="container">
          <Title />
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Login</h5>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={username}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </form>
                  {message && <p>{message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
