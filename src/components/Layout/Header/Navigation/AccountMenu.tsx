import styles from "@/components/Layout/Header/Header.module.css";
import MenuList from "@/components/Layout/Header/Navigation/MenuList";
import { accountItems } from "@/constants/menu";

export default function AccoutPanel() {

  return (
    <>
      <MenuList className={styles["account-container"]} items={accountItems} />
    </>
  );
}

