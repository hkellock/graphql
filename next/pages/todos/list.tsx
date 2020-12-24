import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Todo from '../../components/Todo';
import homeStyles from '../../styles/Home.module.css';

const TodoList = () => (
  <Layout>
    <h1 className={homeStyles.title}>
      <Link href="/">
        <a>Todo app</a>
      </Link>
    </h1>
    <p className={homeStyles.description}>Todo list</p>
    <Todo />
  </Layout>
);

export default TodoList;
