import { Search, Bell } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.search}>
        <Search className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Buscar insumo, factura, cliente..." 
          className={styles.searchInput}
        />
      </div>

      <div className={styles.actions}>
        <button className="btn" style={{ padding: '0.5rem' }}>
          <Bell size={20} color="var(--text-secondary)" />
        </button>
        <div className={styles.user}>
          <div className={styles.avatar}>JD</div>
          <span>Juan Director</span>
        </div>
      </div>
    </header>
  );
}
