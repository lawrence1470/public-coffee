import styles from "./page.module.css";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className={styles.osmoUi}>
      <section className={styles.cloneable}>
        <img 
          src="/coffeebird-black-logo.svg" 
          alt="CoffeeBird Logo" 
          className={styles.osmoIconSvg}
        />
      </section>

      <Footer />
    </div>
  );
}