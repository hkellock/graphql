import Head from 'next/head';
import styles from './layout.module.css';

const Layout: React.FC = (props) => (
  <div className={styles.container}>
    <Head>
      <title>Todo app</title>
    </Head>
    <main className={styles.main}>{props.children}</main>
    <footer className={styles.footer}>
      Powered by a lot of open source code
    </footer>
  </div>
);

export default Layout;
