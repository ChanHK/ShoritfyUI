import React, { Component } from "react";
import {
  fetchShortenedUrls,
  createShortCode,
  deleteShortCode,
} from "../../store/actions/overview.js";
import { logout } from "../../store/actions/authentication.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "../../styles/overview.module.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      showCreateForm: false,
      customCode: null,
      originalUrl: "",
      customCodeError: "",
      originalUrlError: "",
    };
  }

  componentDidMount() {
    const { router } = this.props;
    const token = Cookies.get("token");

    if (!token) {
      this.props.logout();
      router.push("/login");
      return;
    }

    const decodedToken = jwt_decode(token);
    const expirationTime = decodedToken.exp;

    if (expirationTime * 1000 < Date.now()) {
      this.props.logout();
      router.push("/login");
      return;
    }

    this.props.fetchShortenedUrls();
  }

  componentDidUpdate(prevProps) {
    const { shortenData } = this.props.overviewReducer;
    const { overviewReducer } = this.props;

    if (prevProps.overviewReducer !== overviewReducer) {
      this.setState({ data: shortenData });
    }
  }

  componentWillUnmount() {
    this.props.overviewReducer.message = null;
  }

  handleCreateClick = () => {
    this.setState({ showCreateForm: true });
  };

  handleCancel = () => {
    this.setState({
      showCreateForm: false,
      customCode: null,
      originalUrl: "",
      customCodeError: "",
      originalUrlError: "",
    });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreate = () => {
    const { customCode, originalUrl } = this.state;

    let isValid = true;
    let customCodeError = "";
    let originalUrlError = "";

    if (customCode !== null && customCode.trim().length > 10) {
      customCodeError = "Custom code must be within 10 characters.";
      isValid = false;
    }

    if (!originalUrl.trim()) {
      originalUrlError = "Original URL is required.";
      isValid = false;
    } else if (!this.isValidUrl(originalUrl)) {
      originalUrlError = "Invalid URL format.";
      isValid = false;
    }

    if (!isValid) {
      this.setState({ customCodeError, originalUrlError });
      return;
    }

    const nextWeekDate = new Date();
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);

    const newData = {
      customCode: customCode,
      originalUrl,
      expiration: nextWeekDate.toISOString(),
    };

    this.props.createShortCode(newData).then(() => {
      this.props.fetchShortenedUrls();
    });

    this.setState({
      customCodeError: null,
      originalUrlError: null,
      customCode: null,
      originalUrl: "",
    });
  };

  isValidUrl = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  handleDelete = (shortCode) => {
    this.props.deleteShortCode(shortCode).then(() => {
      this.props.fetchShortenedUrls();
    });
  };

  renderCreateForm() {
    const { customCode, originalUrl, customCodeError, originalUrlError } =
      this.state;

    return (
      <div>
        <h3>Create Shorten Code</h3>
        <form>
          <div className="form-group">
            <label htmlFor="customCode">Custom Code (can be empty):</label>
            <input
              type="text"
              className="form-control"
              id="customCode"
              name="customCode"
              value={customCode}
              onChange={this.handleInputChange}
            />
            {customCodeError && (
              <small className="text-danger">{customCodeError}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="originalUrl">Original URL:</label>
            <input
              type="text"
              className="form-control"
              id="originalUrl"
              name="originalUrl"
              value={originalUrl}
              onChange={this.handleInputChange}
            />
            {originalUrlError && (
              <small className="text-danger">{originalUrlError}</small>
            )}
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleCreate}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    const { data, showCreateForm } = this.state;

    return (
      <div className={styles.main}>
        <div className="container">
          <h2>Overview</h2>
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={this.handleCreateClick}
          >
            Create Shorten Code
          </button>
          {showCreateForm && this.renderCreateForm()}
          <table className="table">
            <thead>
              <tr>
                <th>Number</th>
                <th>Shortcode</th>
                <th>Original URL</th>
                <th>Clicks</th>
                <th>Created At</th>
                <th>Expiration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a
                        href={`https://shortify-u856.onrender.com/shorten/${item.shortCode}`}
                      >
                        {item.shortCode}
                      </a>
                    </td>
                    <td>{item.originalUrl}</td>
                    <td>{item.clicks}</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>{new Date(item.expiration).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(item.shortCode)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  fetchShortenedUrls: PropTypes.func.isRequired,
  createShortCode: PropTypes.func.isRequired,
  deleteShortCode: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  overviewReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  overviewReducer: state.overviewReducer,
});

export default connect(mapStateToProps, {
  fetchShortenedUrls,
  createShortCode,
  deleteShortCode,
  logout,
})(Overview);
