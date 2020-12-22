import type { NextComponentType } from 'next'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: { Component: NextComponentType, pageProps: any }) => 
  <Component {...pageProps} />

export default MyApp
