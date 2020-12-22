import Link from 'next/link';
import Layout from '../../components/Layout';
import homeStyles from '../../styles/Home.module.css'

const TodoList = () => (
  <Layout>
    <h1 className={homeStyles.title}>
      <Link href='/' ><a>Todo app</a></Link>
    </h1>
    <p className={homeStyles.description}>
      Todo list
    </p>
  </Layout>
);

export default TodoList;