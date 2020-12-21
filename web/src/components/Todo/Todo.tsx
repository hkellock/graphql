import React from 'react';
import { useQuery, gql } from '@apollo/client';

type TodoItem = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
}

type Todos = {
    todos: TodoItem[];
}

const TODO_QUERY = gql`
    query {
        todos {
            id
            title
        }
    }
`;

const Todo: React.FC = () =>
    {
        const { loading, error, data } = useQuery<Todos>(TODO_QUERY);

        if (loading) return <p>Loading...</p>;
        if (error || !data) return <p>Error!</p>;

        return (
            <ul>
                {
                    data.todos.map((todo) => (
                        <li key={todo.id}>
                            title: {todo.title}
                        </li>
                    ))
                }
            </ul>
        );}

export default Todo;
