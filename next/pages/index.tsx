import Link from 'next/link'
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css'

const Home = () => (
  <Layout>
      <h1 className={styles.title}>
        Todo app
      </h1>
      <p className={styles.description}>
        View your todos here: <Link href='/todos/list' ><a>list</a></Link>.
      </p>
  </Layout>
);

export default Home;