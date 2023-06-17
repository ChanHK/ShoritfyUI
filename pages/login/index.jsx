import React, { Component } from "react";
import styles from "../../styles/login.module.css";
import Title from "../../components/title.jsx";
import { connect } from "react-redux";
import { login } from "../../store/actions/authentication.js";
import PropTypes from "prop-types";
import { withRouter } from 'next/router';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      message: null,
    };
  }

  componentDidMount() {
    if (this.props.authenticateReducer.isAuthenticated) {
      this.props.router.push('/register');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authenticateReducer.isAuthenticated) {
      this.props.router.push('/register');
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };

    e.preventDefault();
    this.props.login(newUser);
  };

  render() {
    const { email, password, message } = this.state;

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
                      <label htmlFor="email">email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  authenticateReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticateReducer: state.authenticateReducer,
});

export default connect(mapStateToProps, { login })(Login);
