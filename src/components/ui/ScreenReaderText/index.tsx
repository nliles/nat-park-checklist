import styles from "./index.module.scss";

type ScreenReaderTextProps = {
  text: string;
};

const ScreenReaderText = ({ text }: ScreenReaderTextProps) => (
  <span className={styles.screenReader}>{text}</span>
);

export default ScreenReaderText;
