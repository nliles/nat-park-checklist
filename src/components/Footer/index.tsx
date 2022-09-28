import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const icons = [
  {
    icon: faLinkedin,
    link: "https://www.linkedin.com/in/nliles/",
  },
  { icon: faGithub, link: "https://github.com/nliles" },
  {
    icon: faInstagram,
    link: "https://www.instagram.com/natalieliles/",
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        {icons.map((i) => (
          <a href={i.link} key={i.link}>
            <FontAwesomeIcon icon={i.icon} />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
