import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home = () => (
  <div className={styles.container}>
    <Head>
      <title>Todo app</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Todo app
      </h1>

      <p className={styles.description}>
        Add some todos
      </p>
    </main>

    <footer className={styles.footer}>
      Powered by a lot of open source code
    </footer>
  </div>
);

export default Home;