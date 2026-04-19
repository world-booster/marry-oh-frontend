import styles from "@/components/Layout/Footer/Footer.module.css";
import Logo from "@/components/Logo/Logo";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* 상단 */}
        <div className={styles.top}>
          <Logo />
          <p className={styles.desc}>
            나만의 결혼을 준비하는 가장 쉬운 방법
          </p>
        </div>

        {/* 메뉴 */}
        <div className={styles.menu}>
          <a href="#">서비스 소개</a>
          <a href="#">이용약관</a>
          <a href="#">개인정보처리방침</a>
          <a href="#">고객센터</a>
        </div>

        {/* 하단 */}
        <div className={styles.bottom}>
          <p>© 2026 Marry-OH. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}