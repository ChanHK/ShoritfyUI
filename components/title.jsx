import React, { Component } from "react";
import styles from "../styles/title.module.css";

class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <svg className={styles.svg}>
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="50%" dy=".35em">
              SHORTIFY
            </text>
          </symbol>
          <use className={styles.text} xlinkHref="#s-text"></use>
          <use className={styles.text} xlinkHref="#s-text"></use>
          <use className={styles.text} xlinkHref="#s-text"></use>
          <use className={styles.text} xlinkHref="#s-text"></use>
          <use className={styles.text} xlinkHref="#s-text"></use>
        </svg>
      </div>
    );
  }
}

export default Title;
