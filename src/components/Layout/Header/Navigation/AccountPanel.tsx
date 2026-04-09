import styles from "../Header.module.css";
import MenuList from "./MenuList";




const accountItems = [
  { label: "로그인", href: "#" },
  { label: "회원가입", href: "#" },
];

export default function AccoutPanel() {

  return (
    <div>
      <MenuList className={styles["account-container"]} items={accountItems} />
    </div>
  );
}

