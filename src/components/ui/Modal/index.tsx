import React from "react";
import cn from "classnames";
import styles from "./index.module.scss";

const ModalRoot = () => {
  return (
    <div
      className={styles.dialog}
      role="dialog"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <h1 id="dialog-title">Site Navigation</h1>
      <p id="dialog-description" className="sr-only">
        Description goes here
      </p>
      <button
        type="button"
        aria-label="Close Navigation"
        className="close-dialog"
      >
        X
      </button>
    </div>
  );
};

export default ModalRoot;
