import Link from 'next/link'
import styles from '../pages/index.module.css'

export const NavHeader = ({active}) => {
  return (
    <header className={styles.main_header}>
      <nav className={styles.main_header__nav}>
        <ul className={styles.main_header__item_list}>
          <li className={styles.main_header__item}>
            <Link className={active == 'shop'?styles.active:''} href="/shop">THE Shop</Link>
          </li>
          <li className={styles.main_header__item}>
            <Link className={active == 'add-product'?styles.active:''} href="/admin/add-product">Add Product</Link>
          </li>
          <li className={styles.main_header__item}>
            <Link className={active == 'octopus'?styles.active:''} href="/octopus">Octopus</Link></li>
        </ul>
      </nav>
    </header>    
  )
}