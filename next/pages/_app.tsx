import { ApolloProvider } from '@apollo/client';
import type { NextComponentType } from 'next';
import { client } from '../lib/apolloClient';
import '../styles/globals.css';

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: NextComponentType;
  pageProps: any;
}) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default MyApp;
