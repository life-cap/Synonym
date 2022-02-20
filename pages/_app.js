import '../styles/globals.css'
import "@fontsource/inter/800.css";
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../chakra/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp