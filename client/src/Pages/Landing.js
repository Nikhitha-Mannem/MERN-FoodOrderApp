import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles['landing-wrapper']}>
      <div className={styles.overlay}>
        <h1>Welcome to FoodieExpress</h1>
        <p>Order your favorite meals in seconds</p>
        <div className={styles.buttons}>
          <Link to="/login" className={`${styles.btn}`}>Login</Link>
          <Link to="/signup" className={`${styles.btn} ${styles.secondary}`}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
