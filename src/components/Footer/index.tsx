import styles from "./index.module.scss";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { icons } from './const';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        {icons.map((i) => (
          <a href={i.link} key={i.link}>
            {i.icon === "linkedIn" && <FaLinkedin />}
            {i.icon === "github" && <FaGithub />}
            {i.icon === "instagram" && <FaInstagram />}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
