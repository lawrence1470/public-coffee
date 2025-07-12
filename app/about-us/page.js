import Navigation from '../components/Navigation';
import styles from "../page.module.css";

export default function AboutUs() {
  return (
    <div className={styles.osmoUi}>
      <Navigation />
      
      <section className={styles.cloneable}>
        <div style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>About Us</h1>
          <p style={{ fontSize: '1.5rem', lineHeight: '1.6' }}>
            Welcome to our About Us page. This is where we share our story.
          </p>
        </div>
      </section>

      <div className={styles.osmoCredits}>
        <p className={styles.osmoCreditsP}>
          Resource by <a target="_blank" href="https://www.osmo.supply/" className={styles.osmoCreditsA}>Osmo</a>
        </p>
      </div>
    </div>
  );
}