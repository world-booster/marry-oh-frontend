import styles from "./Header.module.css";
import logo from "../../../assets/images/logo/logo-text-only.png";



export default function Logo() {
  return (
    <a className={styles.logo} href="#">
      <div className={styles.logotemp}> MARRYOH!</div>
      {/*<img src={logo} alt="logo" />*/}
    </a>
  );
}