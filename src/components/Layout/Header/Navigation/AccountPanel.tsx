import styles from "../Header.module.css";
import MenuList from "./MenuList";

const accountItems = [
  { label: "로그인", menuKey: "#" },
  { label: "회원가입", menuKey: "#" },
];

export default function AccoutPanel() {

  return (
    <>
      <MenuList className={styles["account-container"]} items={accountItems} />
    </>
  );
}

