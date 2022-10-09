import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

export interface IProgressBar {
  completed: number;
  total: number;
}

const ProgressBar = ({ completed, total }: IProgressBar) => {
  const [percentCompleted, setPercentCompleted] = useState(0);

  useEffect(() => {
    let newPercentCompleted = 0;
    if (total !== 0) {
      newPercentCompleted = (completed * 100) / total;
    }
    setPercentCompleted(newPercentCompleted);
  }, [completed, total]);

  return (
    <div className={styles.container}>
      <progress
        data-qaid="progress-bar"
        className={styles.progress}
        value={`${percentCompleted}`}
        max="100"
      >
        {percentCompleted}%
      </progress>
    </div>
  );
};

export default ProgressBar;
