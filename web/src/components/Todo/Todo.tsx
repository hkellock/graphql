import React from 'react';
import { useQuery, gql } from '@apollo/client';

const TODO_QUERY = gql`
    query {
        todos {
            id
        }
    }
`;

const Todo: React.FC = () =>
    {
        const { loading, error, data } = useQuery(TODO_QUERY);
        
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error!</p>;

        return (
            <ul>
                {
                    data.todos.map(({ id }: { id: string }) => (
                        <li key={id}>
                            id: {id}
                        </li>
                    ))
                }
            </ul>
        );}

export default Todo;
