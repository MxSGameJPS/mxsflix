import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingArea}>
      <div className={styles.loader}></div>
    </div>
  );
}
