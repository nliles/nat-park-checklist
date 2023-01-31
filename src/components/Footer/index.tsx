import { FaInstagram, FaUser, FaLinkedin, FaGithub } from "react-icons/fa";
import { icons } from "components/Footer/constants";
import Icon from "enum/Icon";
import styles from "./index.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        {icons.map((i) => (
          <a href={i.link} key={i.link}>
            {i.icon === Icon.LINKED_IN && <FaLinkedin />}
            {i.icon === Icon.GITHUB && <FaGithub />}
            {i.icon === Icon.INSTAGRAM && <FaInstagram />}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
