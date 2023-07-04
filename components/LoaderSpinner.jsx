import React, { useEffect } from "react";
import { Circles } from "react-loader-spinner";
import styles from "../styles/loaderSpinner.module.css";

const LoaderSpinner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  });
  return (
    <div className={styles.container}>
      <Circles color="#00BFFF" height={100} width={100} />
    </div>
  );
};

export default LoaderSpinner;