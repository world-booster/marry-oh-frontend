import styles from "./Header.module.css";
import logo from "../../../assets/images/logo/logo-text-only.png";

export default function Logo() {
  return (
    <a className={styles.logo} href="#">
      <img src={logo} alt="logo" />
    </a>
  );
}