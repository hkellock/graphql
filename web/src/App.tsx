import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import './App.css';
import Todo from './components/Todo/Todo';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">Todo app</header>
      <Todo />
    </div>
  </ApolloProvider>
);

export default App;
