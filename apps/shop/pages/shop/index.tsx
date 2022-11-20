import { NavHeader } from '../../components'
import styles from './index.module.css';

export function Index() {
  return (
    <div className={styles.all}>
      <NavHeader active="shop" />

      <main className={styles.main}>
        <h1>Welcome to THE Shop</h1>

        <h2>Our Products</h2>
        <p>List of all the products ...</p>
      </main>
    </div>
  )
}

export default Index;
