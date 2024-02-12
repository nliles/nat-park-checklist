import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { icons } from "components/Footer/constants";
import Icon from "enum/Icon";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        {icons.map((i) => (
          <a href={i.link} key={i.link}>
            {i.icon === Icon.LINKED_IN && <FaLinkedin aria-label="LinkedIn" />}
            {i.icon === Icon.GITHUB && <FaGithub aria-label="Github" />}
            {i.icon === Icon.INSTAGRAM && (
              <FaInstagram aria-label="Instagram" />
            )}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
